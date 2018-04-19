package models

import (
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"github.com/astaxie/beego"
	"github.com/grokify/html-strip-tags-go"
)

type BgImage struct {
	Bi_id int `orm:"column(bi_id);pk"`
	Src string `orm:"size(255)"`
	Year int
	North float64
	West float64
	South float64
	East float64
}

type Marker struct {
	Marker_id int64 `orm:"column(marker_id);pk"`
	X float64
	Y float64
}

type MarkerTitle struct {
	Title_id int64 `orm:"column(title_id);pk"`
	Marker_id int64
	Title string
	Lang_id int64
}

type Lang struct {
	Lang_id int64 `orm:"column(lang_id);pk"`
	Code string
	Title string
}

func init() {
	orm.RegisterModel(new(BgImage))
	orm.RegisterModel(new(Marker))
	orm.RegisterModel(new(MarkerTitle))
	orm.RegisterModel(new(Lang))

	orm.RegisterDataBase(
		"default",
			"mysql",
			beego.AppConfig.String("mysqluser") + ":" + beego.AppConfig.String("mysqlpass") + "@/" + beego.AppConfig.String("mysqldb") + "?charset=utf8",
			30)
}

func CreateMarker(x float64, y float64, title string, lang string) (newMarkerId int64, err error) {
	o := orm.NewOrm()

	err = o.Begin()

	var curLang Lang
	if err == nil {
		curLang.Code = lang
		err = o.Read(&curLang, "Code")
	}

	var newMarker Marker
	if err == nil {
		newMarker.X = x
		newMarker.Y = y

		newMarkerId, err = o.Insert(&newMarker)
	}

	var newTitle MarkerTitle
	if err == nil {
		newTitle.Lang_id = curLang.Lang_id
		newTitle.Marker_id = newMarkerId
		newTitle.Title = strip.StripTags(title)

		_, err = o.Insert(&newTitle)
	}

	if err != nil {
		o.Rollback()
	} else {
		err = o.Commit()
	}

	return newMarkerId, err
}

func GetMarkersList(lang string) (markers []orm.Params, err error){
	o := orm.NewOrm()

	//o.Raw("SELECT m.marker_id, m.x, m.y FROM marker m").Values(&markers)
	_, err = o.Raw("SELECT m.marker_id, m.x, m.y, t.title, (SELECT count(*) FROM photo p WHERE p.marker_id = m.marker_id) as cnt FROM marker m " +
		"INNER JOIN marker_title t ON t.marker_id = m.marker_id " +
		"INNER JOIN lang l ON t.lang_id = l.lang_id " +
		"WHERE l.code = ? ORDER BY m.marker_id ASC", lang).Values(&markers)

	return markers, err
}