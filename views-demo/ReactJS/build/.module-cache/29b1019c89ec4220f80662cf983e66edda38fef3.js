function FormattedDate(props){
	return React.createElement("h2", null, "现在是", props.date.toLocaleDateString())
}
