package models

const DB_ERROR  = 1
const JSON_PARSING = 2

type ApiResponse struct {
	Status string
	Code int
	Data map[string]interface{}
}

func (this *ApiResponse) SetError(code int, err error) {
	this.Status = "error"
	this.Code = code

	this.Data = make(map[string]interface{})
	this.Data["errorMsg"] = err.Error()
}

func (this *ApiResponse) SetSuccess() {
	this.Status = "success"
	this.Data = make(map[string]interface{})
}