/**
 * BLOCK: UAGB Section Attributes
 */

const attributes = {	
	infoBoxTitle: {
		source: "html",
		selector: "h1,h2,h3,h4,h5,h6",
		default: "Info Box",
	},
	headingDesc: {
		source: "html",
		selector: "p",
		default: "Click here to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
	},
	headingAlign: {
		type: "string",
		default: "center",
	},
	headingColor: {
		type: "string",
	},
	subHeadingColor: {
		type: "string",
	},	
	icon : {
		type : "string",
		default : "fa fa-star"
	},
	iconimgPosition: {
		type: "string",
		default: "above-title"
	},
	iconSize : {
		type: "number",
		default: 40,
	},
	iconHover : {
		type : "string",
		default : ""
	},
	iconBgHover : {
		type : "string",
		default : ""
	},
	iconColor : {
		type : "string",
		default : "#333",
	},	
	headingTag: {
		type: "string",
		default: "h3"
	},
	separatorHeight: {
		type: "number"
	},
	separatorWidth: {
		type: "number"
	},
	headFontSize: {
		type: "number",
	},
	subHeadFontSize: {
		type: "number",
	},
	headSpace: {
		type: "number",
		default : 10,
	},
	subHeadSpace: {
		type: "number",
		default : 10,
	},
	seperatorSpace:{
		type: "number",
		default : 10,
	},
	iconimgBorderRadius: {
		type: "number",
		default : 0
	},
	source_type :{
		type: "string",
		default: "icon",
	},
	block_id :{
		type : "string",
		default : "not_set"
	},
	sourceAlign:{
		type : "string",
		default : "top"
	},
	ctaTarget: {
		type: "boolean",
		default: false,
	},
	ctaIcon : {
		type : "string",
		default : ""
	},
	ctaIconPosition: {
		type: "string",
		default: "after"
	},
	ctaIconSpace :{
		type: "number",
		default : 5
	},	
	ctaType: {
		type: "string",
		default: "button",
	},
	ctaText: {
		type: "string",
		default: "Read More",
	},
	ctaLink: {
		type: "string",
		default: "#",
	},
	ctaLinkColor :{
		type: "string",
		default: "#333",
	},
	ctaFontSize :{
		type: "number",
	},
	ctaBtnLinkColor :{
		type: "string",
		default: "#333",
	},
	ctaLinkHoverColor:{
		type: "string",
		default: "",
	},
	ctaBgColor :{
		type: "string",
		default:"transparent",
	},
	ctaBgHoverColor :{
		type: "string",
		default:"transparent",
	},
	ctaBorderColor: {
		type: "string",
		default: "#333",
	},
	ctaBorderhoverColor:{
		type: "string",
		default: "",
	},
	ctaBorderStyle: {
		type: "string",
		default: "solid",
	},
	ctaBtnVertPadding :{
		type: "number",
		default: 10,
	},
	ctaBtnHrPadding :{
		type: "number",
		default: 14,
	},
	ctaBorderWidth :{
		type: "number",
		default: 1,
	},
	ctaBorderRadius :{
		type: "number",
		default: 0,
	},	
	iconLeftMargin :{
		type: "number",
		default: 10,
	},
	iconRightMargin :{
		type: "number",
		default: 10,
	},
	iconTopMargin :{
		type: "number",
		default: 5,
	},
	iconBottomMargin :{
		type: "number",
		default: 5,
	},
	iconImage: {
		type: "object",
		default:{
			"url": "",
			"alt": "InfoBox placeholder img",
		}
	},
	imageSize:{
		type: "string",
		default: "thumbnail",
	},
	imageWidth :{
		type: "number",
		default: 120,
	},
	stack: {
		type: "string",
		default: "tablet"
	},	
	showTitle: {
		type: "boolean",
		default: true,
	},
	showDesc: {
		type: "boolean",
		default: true,
	},
}

export default attributes
