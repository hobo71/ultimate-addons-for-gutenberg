/**
 * BLOCK: Section
 */

import classnames from "classnames"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"

//  Import CSS.
import "./style.scss"
import "./editor.scss"
import attributes from "./attributes"
import edit from "./edit"
import inlineStyles from "./inline-styles"


// Components
const { __ } = wp.i18n

// Register block controls
const {
	registerBlockType
} = wp.blocks

const {
	InnerBlocks,
} = wp.editor

/**
 * Register: as Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( "uagb/section", {
	title: uagb_blocks_info.blocks["uagb/section"]["title"],
	description: uagb_blocks_info.blocks["uagb/section"]["description"],
	icon: UAGB_Block_Icons.section,
	category: uagb_blocks_info.category,
	keywords: [
		__( "section" ),
		__( "uagb" ),
	],
	attributes,
	getEditWrapperProps( { blockAlignment } ) {
		if ( "left" === blockAlignment || "right" === blockAlignment || "center" === blockAlignment ) {
			return { "data-align": blockAlignment }
		}
	},
	edit,
	save : function( props ) {

		const { attributes, className } = props

		const {
			block_id,
			tag,
			backgroundType,
			backgroundVideo
		} = props.attributes

		const CustomTag = `${tag}`

		return (
			<CustomTag
				className={ classnames(
					className,
					"uagb-section__wrap",
					`uagb-section__background-${backgroundType}`
				) }
				id={ `uagb-section-${block_id}` }
			>
				<div className="uagb-section__overlay"></div>
				{ "video" == backgroundType &&
					<div className="uagb-section__video-wrap">
						{  backgroundVideo &&
						<video src={ backgroundVideo.url } autoPlay loop muted></video>
						}

					</div>
				}
				<div className="uagb-section__inner-wrap">
					<InnerBlocks.Content />
				</div>
			</CustomTag>
		)
	}
} )