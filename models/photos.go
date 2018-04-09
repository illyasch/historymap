package models

import (
	"github.com/astaxie/beego/orm"
	"strconv"
	"github.com/astaxie/beego"
	"strings"
	"os"
	"image"
	_ "image/png"
	_ "image/jpeg"
	_ "image/gif"
	"github.com/astaxie/beego/logs"
)

type Photo struct {
	Photo_id int64 `orm:"column(photo_id);pk"`
	Marker_id int64
	Src string
	Width int
	Height int
}

type PhotoText struct {
	Text_id int64 `orm:"column(text_id);pk"`
	Photo_id int64
	Lang_id int64
	About string
}

func init() {
	orm.RegisterModel(new(Photo))
	orm.RegisterModel(new(PhotoText))
}

func GetPhotosList(lang string, markerId int64) (photos []orm.Params, err error){
	o := orm.NewOrm()

	_, err = o.Raw("SELECT p.photo_id, p.src, p.width, p.height, pt.about FROM photo p " +
		"INNER JOIN photo_text pt ON p.photo_id = pt.photo_id " +
		"INNER JOIN lang l ON pt.lang_id = l.lang_id " +
		"WHERE p.marker_id = ? AND l.code = ? ORDER BY p.photo_id ASC", markerId, lang).Values(&photos)

	return photos, err
}

type SaveToFile interface {
	SaveToFile(fromfile, tofile string) error
}

func CreatePhoto(this SaveToFile, paramName string, filename string, marker string, text string, lang string) (int64, error) {
	fileExt := getFileExtension(filename)

	logger := logs.NewLogger(100)

	o := orm.NewOrm()
	err := o.Begin()

	var curLang Lang
	if err == nil {
		curLang.Code = lang
		err = o.Read(&curLang, "Code")
	}

	var curMarker Marker
	curMarker.Marker_id, err = strconv.ParseInt(marker, 10, 64)

	if err == nil {
		err = o.Read(&curMarker)
	}

	var newPhoto Photo
	if err == nil {
		newPhoto.Marker_id = curMarker.Marker_id
		newPhoto.Photo_id, err = o.Insert(&newPhoto)
	}

	newFileName := strconv.FormatInt(newPhoto.Photo_id, 10) + fileExt
	imagePath := beego.AppConfig.String("uploadDir") + newFileName
	err = this.SaveToFile(paramName, imagePath)

	if err == nil {
		newPhoto.Width, newPhoto.Height, err = getImageDimension(imagePath)
	}

	if err == nil {
		newPhoto.Src = newFileName
		_, err = o.Update(&newPhoto)
	}

	logger.Debug("%v", newPhoto)

	var newPhotoText PhotoText
	if err == nil {
		newPhotoText.Photo_id = newPhoto.Photo_id
		newPhotoText.Lang_id = curLang.Lang_id
		newPhotoText.About = text

		newPhotoText.Text_id, err = o.Insert(&newPhotoText)
	}

	if err != nil {
		o.Rollback()
	} else {
		err = o.Commit()
	}

	return newPhoto.Photo_id, err
}

func getFileExtension(fileName string) string {
	parts := strings.Split(fileName, ".")

	if len(parts) > 0 {
		return "." + parts[len(parts) - 1]

	}

	return ""
}

func getImageDimension(imagePath string) (int, int, error) {
	file, err := os.Open(imagePath)
	if err != nil {
		return 0, 0, err
	}

	defer file.Close()

	img, _, err := image.DecodeConfig(file)
	if err != nil {
		return 0, 0, err
	}

	return img.Width, img.Height, err
}