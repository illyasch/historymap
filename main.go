package main

import (
	_ "historymap/routers"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
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
	Marker_id int `orm:"column(marker_id);pk"`
	X float64
	Y float64
	Title string `orm:"size(255)"`
}

func init() {
	orm.RegisterModel(new(BgImage))
	orm.RegisterModel(new(Marker))
	orm.RegisterDataBase("default", "mysql", "root:pwd123@/historymap?charset=utf8", 30)
}

func main() {
	beego.Run()
}

