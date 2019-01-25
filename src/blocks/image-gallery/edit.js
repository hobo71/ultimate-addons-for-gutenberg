/**
 * BLOCK: UAGB - Image Gallery Edit Class
 */

// Import classes
import filter from "lodash/filter"
import pick from "lodash/pick"
import map from "lodash/map"
import get from "lodash/get"
import shuffle from "lodash/shuffle"
import classnames from "classnames"
import times from "lodash/times"
import styling from "./styling"

const MAX_GALLERY_COLUMNS = 4
const { __ } = wp.i18n

const {
	Component,
	Fragment,
} = wp.element

const {
	BlockControls,
	MediaUpload,
	MediaPlaceholder,
	InspectorControls,
	mediaUpload,
	PanelColorSettings
} = wp.editor

const {
	IconButton,
	DropZone,
	FormFileUpload,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	Toolbar,
	withNotices,
	TabPanel
} = wp.components

const linkOptions = [
	{ value: "attachment", label: __( "Attachment Page" ) },
	{ value: "media", label: __( "Media File" ) },
	{ value: "none", label: __( "None" ) },
]

const effectOptions = [
	{ value: "normal", label: __( "Normal" ) },
	{ value: "a-1977", label: __( "1977" ) },
	{ value: "aden", label: __( "Aden" ) },
	{ value: "earlybird", label: __( "Earlybird" ) },
	{ value: "hudson", label: __( "Hudson" ) },
	{ value: "inkwell", label: __( "Inkwell" ) },
	{ value: "perpetua", label: __( "Perpetua" ) },
	{ value: "poprocket", label: __( "Poprocket" ) },
	{ value: "sutro", label: __( "Sutro" ) },
	{ value: "toaster", label: __( "Toaster" ) },
	{ value: "willow", label: __( "Willow" ) },
]

const heffectOptions = [
	{ value: "normal", label: __( "Inherit" ) },
	{ value: "a-1977", label: __( "1977" ) },
	{ value: "aden", label: __( "Aden" ) },
	{ value: "earlybird", label: __( "Earlybird" ) },
	{ value: "hudson", label: __( "Hudson" ) },
	{ value: "inkwell", label: __( "Inkwell" ) },
	{ value: "perpetua", label: __( "Perpetua" ) },
	{ value: "poprocket", label: __( "Poprocket" ) },
	{ value: "sutro", label: __( "Sutro" ) },
	{ value: "toaster", label: __( "Toaster" ) },
	{ value: "willow", label: __( "Willow" ) },
]

export function defaultColumnsNumber( attributes ) {
	return Math.min( 3, attributes.images.length )
}

export const pickRelevantMediaFiles = ( image ) => {
	const imageProps = pick( image, [ "alt", "id", "link", "caption" ] )
	imageProps.url = get( image, [ "sizes", "large", "url" ] ) || get( image, [ "media_details", "sizes", "large", "source_url" ] ) || image.url
	return image
}


class UAGBImageGallery extends Component {

	constructor() {
		super( ...arguments )
		this.onSelectImages = this.onSelectImages.bind( this )
		this.setAttributes = this.setAttributes.bind( this )
	}

	setAttributes( attributes ) {

		if ( attributes.ids ) {
			throw new Error( "The \"ids\" attribute should not be changed directly. It is managed automatically when \"images\" attribute changes" )
		}

		if ( attributes.images ) {
			attributes = {
				...attributes,
				ids: map( attributes.images, "id" ),
			}
		}

		this.props.setAttributes( attributes )
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-style-gallery-" + this.props.clientId )
		document.head.appendChild( $style )

	}

	onSelectImages( images ) {

		this.setAttributes( {
			images: images.map( ( image ) => pickRelevantMediaFiles( image ) ),
		} )

		this.props.setAttributes( {
			images: images.map( ( image ) => pickRelevantMediaFiles( image ) ),
		} )
	}

	render() {

		const { attributes, setAttributes, isSelected, className, noticeOperations, noticeUI } = this.props

		const {
			images,
			align,
			linkTo,
			columns,
			tcolumns,
			mcolumns,
			captionPadding,
			rowGap,
			columnGap,
			target,
			imgSize,
			layout,
			order,
			scale,
			opacity,
			effect,
			overlayColor,
			overlayOp,
			hscale,
			hopacity,
			heffect,
			hoverlayColor,
			hoverlayOp,
			showCaption,
			captionAlign,
			captionVAlign,
			capColor,
			capBgColor,
			capBgColorOp
		} = attributes

		var element = document.getElementById( "uagb-style-gallery-" + this.props.clientId )

		if( null != element && "undefined" != typeof element ) {
			element.innerHTML = styling( this.props )
		}

		const editControl = (
			<BlockControls>
				{ !! images.length && (
					<Toolbar>
						<MediaUpload
							onSelect={ this.onSelectImages }
							allowedTypes={ [ "image" ] }
							multiple
							gallery
							value={ images.map( ( img ) => img.id ) }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( "Edit Gallery" ) }
									icon="edit"
									onClick={ open }
								/>
							) }
						/>
					</Toolbar>
				) }
			</BlockControls>
		)

		if ( images.length === 0 ) {
			return (
				<Fragment>
					{ editControl }
					<MediaPlaceholder
						icon="format-gallery"
						className={ className }
						labels={ {
							title: __( "Gallery" ),
							instructions: __( "Drag images, upload new ones or select files from your library." ),
						} }
						onSelect={ this.onSelectImages }
						accept="image/*"
						allowedTypes={ [ "image" ] }
						multiple
						notices={ noticeUI }
						onError={ noticeOperations.createErrorNotice }
					/>
				</Fragment>
			)
		}

		let images_set = images

		if ( "random" == order ) {
			images_set = shuffle( images )
		}

		const normalSettings = (
			<Fragment>
				<RangeControl
					label={ __( "Scale" ) }
					value={ scale }
					onChange={ ( value ) => setAttributes( { scale: value } ) }
					min={ 100 }
					max={ 200 }
				/>
				<RangeControl
					label={ __( "Opacity (%)" ) }
					value={ opacity }
					onChange={ ( value ) => setAttributes( { opacity: value } ) }
					min={ 1 }
					max={ 100 }
				/>
				<SelectControl
					label={ __( "Image Effect" ) }
					value={ effect }
					onChange={ ( value ) => setAttributes( { effect: value } ) }
					options={ effectOptions }
				/>
				<PanelColorSettings
					title={ __( "Color" ) }
					colorSettings={[
						{
							value: overlayColor,
							onChange:( value ) => setAttributes( { overlayColor: value } ),
							label: __( "Overlay Color" ),
						}
					]}>
				</PanelColorSettings>
				<RangeControl
					label={ __( "Overlay Opacity" ) }
					value={ overlayOp }
					onChange={ ( value ) => setAttributes( { overlayOp: value } ) }
					min={ 1 }
					max={ 100 }
				/>
			</Fragment>
		)

		const hoverSettings = (
			<Fragment>
				<RangeControl
					label={ __( "Scale" ) }
					value={ hscale }
					onChange={ ( value ) => setAttributes( { hscale: value } ) }
					min={ 100 }
					max={ 200 }
				/>
				<RangeControl
					label={ __( "Opacity (%)" ) }
					value={ hopacity }
					onChange={ ( value ) => setAttributes( { hopacity: value } ) }
					min={ 1 }
					max={ 100 }
				/>
				<SelectControl
					label={ __( "Image Effect" ) }
					value={ heffect }
					onChange={ ( value ) => setAttributes( { heffect: value } ) }
					options={ heffectOptions }
				/>
				<PanelColorSettings
					title={ __( "Color" ) }
					colorSettings={[
						{
							value: hoverlayColor,
							onChange:( value ) => setAttributes( { hoverlayColor: value } ),
							label: __( "Overlay Color" ),
						}
					]}>
				</PanelColorSettings>
				<RangeControl
					label={ __( "Overlay Opacity" ) }
					value={ hoverlayOp }
					onChange={ ( value ) => setAttributes( { hoverlayOp: value } ) }
					min={ 1 }
					max={ 100 }
				/>
			</Fragment>
		)

		return (
			<Fragment>
				{ editControl }
				<InspectorControls>
					<PanelBody title={ __( "Layout" ) }>
						<SelectControl
							label={ __( "Layout" ) }
							value={ layout }
							onChange={ ( value ) => setAttributes( { layout: value } ) }
							options={ [
								{ value: "grid", label: __( "Grid" ) },
								{ value: "masonry", label: __( "Masonry" ) },
								{ value: "carousel", label: __( "Carousel" ) },
								{ value: "justified", label: __( "Justified" ) },
							] }
						/>
						<RangeControl
							label={ __( "Columns" ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 1 }
							max={ Math.min( MAX_GALLERY_COLUMNS, images.length ) }
						/>
						<RangeControl
							label={ __( "Columns (Tablet)" ) }
							value={ tcolumns }
							onChange={ ( value ) => setAttributes( { tcolumns: value } ) }
							min={ 1 }
							max={ Math.min( MAX_GALLERY_COLUMNS, images.length ) }
						/>
						<RangeControl
							label={ __( "Columns (Mobile)" ) }
							value={ mcolumns }
							onChange={ ( value ) => setAttributes( { mcolumns: value } ) }
							min={ 1 }
							max={ Math.min( MAX_GALLERY_COLUMNS, images.length ) }
						/>
					</PanelBody>
					<PanelBody title={ __( "Images" ) } initialOpen={ false }>
						<SelectControl
							label={ __( "Image Size" ) }
							value={ imgSize }
							onChange={ ( value ) => setAttributes( { imgSize: value } ) }
							options={ [
								{ value: "full", label: __( "Full" ) },
								{ value: "medium", label: __( "Medium" ) },
								{ value: "thumbnail", label: __( "Thumbnail" ) },
							] }
						/>
						<SelectControl
							label={ __( "Click Action" ) }
							value={ linkTo }
							onChange={ ( value ) => setAttributes( { linkTo: value } ) }
							options={ linkOptions }
						/>
						{ "none" != linkTo &&
							<ToggleControl
								label={ __( "Open in New Tab" ) }
								checked={ target }
								onChange={ ( value ) => setAttributes( { target: ! target } ) }
							/>
						}
						<SelectControl
							label={ __( "Order" ) }
							value={ order }
							onChange={ ( value ) => setAttributes( { order: value } ) }
							options={ [
								{ value: "default", label: __( "Default" ) },
								{ value: "random", label: __( "Random" ) }
							] }
						/>
					</PanelBody>
					<PanelBody title={ __( "Effects" ) } initialOpen={ false }>
						<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
							activeClass="active-tab"
							tabs={ [
								{
									name: "normal",
									title: __( "Normal" ),
									className: "uagb-normal-tab",
								},
								{
									name: "hover",
									title: __( "Hover" ),
									className: "uagb-focus-tab",
								},
							] }>
							{
								( tabName ) => {
									let tabout
									if ( "hover" === tabName.name ) {
										tabout = hoverSettings
									} else {
										tabout = normalSettings
									}
									return <div>{ tabout }</div>
								}
							}
						</TabPanel>
					</PanelBody>
					<PanelBody title={ __( "Caption" ) } initialOpen={ false }>
						<SelectControl
							label={ __( "Show Caption" ) }
							value={ showCaption }
							onChange={ ( value ) => setAttributes( { showCaption: value } ) }
							options={ [
								{ value: "image", label: __( "On Image" ) },
								{ value: "hover", label: __( "On Hover" ) },
							] }
						/>
						<SelectControl
							label={ __( "Caption Alignment" ) }
							value={ captionAlign }
							onChange={ ( value ) => setAttributes( { captionAlign: value } ) }
							options={ [
								{ value: "left", label: __( "Left" ) },
								{ value: "right", label: __( "Right" ) },
								{ value: "center", label: __( "Center" ) },
							] }
						/>
						<SelectControl
							label={ __( "Vertical Alignment" ) }
							value={ captionVAlign }
							onChange={ ( value ) => setAttributes( { captionVAlign: value } ) }
							options={ [
								{ value: "top", label: __( "Top" ) },
								{ value: "bottom", label: __( "Bottom" ) },
								{ value: "middle", label: __( "Middle" ) },
							] }
						/>
						<PanelColorSettings
							title={ __( "Color" ) }
							colorSettings={[
								{
									value: capColor,
									onChange:( value ) => setAttributes( { capColor: value } ),
									label: __( "Caption Color" ),
								},
								{
									value: capBgColor,
									onChange:( value ) => setAttributes( { capBgColor: value } ),
									label: __( "Caption Background Color" ),
								}
							]}>
						</PanelColorSettings>
						<RangeControl
							label={ __( "Caption Background Opacity" ) }
							value={ capBgColorOp }
							onChange={ ( value ) => setAttributes( { capBgColorOp: value } ) }
							min={ 1 }
							max={ 100 }
						/>
						<RangeControl
							label={ __( "Caption Padding" ) }
							value={ captionPadding }
							onChange={ ( value ) => setAttributes( { captionPadding: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
					</PanelBody>
					<PanelBody title={ __( "Spacing" ) } initialOpen={ false }>
						<RangeControl
							label={ __( "Row Gap" ) }
							value={ rowGap }
							onChange={ ( value ) => setAttributes( { rowGap: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
						<RangeControl
							label={ __( "Column Gap" ) }
							value={ columnGap }
							onChange={ ( value ) => setAttributes( { columnGap: value } ) }
							min={ 0 }
							max={ 50 }
							allowReset
						/>
					</PanelBody>
				</InspectorControls>
				{ noticeUI }
				<div className={ classnames(
					className,
					"uagb-gallery__outer-wrap",
					`uagb-gallery__layout-${ layout }`,
					`uagb-gallery__columns-${ columns }`,
					`uagb-gallery__columns-tablet-${ tcolumns }`,
					`uagb-gallery__columns-mobile-${ mcolumns }`,
					`uagb-gallery__caption-show-${ showCaption }`,
					`uagb-gallery__caption-align-${ captionAlign }`,
					`uagb-gallery__caption-valign-${ captionVAlign }`,
					`uagb-ins-${ effect }`,
					`uagb-ins-hover-${ heffect }`,
				) }
				id={ `uagb-gallery-${ this.props.clientId }` }>
					{ images_set.map( ( img, index ) => {
						
						let img_url = ""
						let img_src = ""

						if ( "attachment" == linkTo ) {
							img_url = img.link
						}

						if( typeof img !== "undefined" && img !== null && img !=="" ){
							img_url = img.url
						}

						if( img_url !== "" ){
							let size = img.sizes
							let imageSize = attributes.imgSize

							if ( typeof size !== "undefined" && typeof size[imageSize] !== "undefined" ) {
							  img_src = size[imageSize].url 
							}else{
							  img_src = img_url 
							}
						}

						const img_html = (
							<img
								src={ img_src }
								alt={ img.alt }
								id={ img.id }
								caption={ img.caption }
								aria-label={ img.caption }
								tabIndex="0"
								data-id={ img.id }
							/>
						)

						let image_html = img_html

						if ( "none" != linkTo ) {
							image_html = (
								<a className="uagb-gallery__link" href={ img_url }>{ img_html }</a>
							)
						}

						return (
							<div className={ classnames(
								"uagb-gallery__item",
								`uagb-gallery__item-${index}`,
								"uagb-ins-hover"
							) }
							key={ img.id || img.url }>
								<div className="uagb-gallery__content">
									<div className="uagb-gallery__thumnail uagb-ins-target">
										{ image_html }
									</div>
									<div className="uagb-gallery__img-overlay"></div>
									{ "" != img.caption &&

										<figcaption className="uagb-gallery__caption-wrap">
											<div className="uagb-gallery__caption">
												<p className="uagb-gallery__caption-text">{ img.caption }</p>
											</div>
										</figcaption>
									}
								</div>
							</div>
						)
					})}
				</div>
			</Fragment>
		)
	}
}

export default withNotices( UAGBImageGallery )