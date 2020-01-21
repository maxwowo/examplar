package skylar

import "fmt"

func LikePad(str string) string {
	return fmt.Sprintf("%%%s%%", str)
}
