package models

import "github.com/astaxie/beego/orm"

type Photo struct {
	Photo_id int64 `orm:"column(photo_id);pk"`
	Marker_id int64
	Src string
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