/**
 * @module {Module} bitballs/components/player/list <player-list>
 * @parent bitballs.components
 *
 * @group bitballs/components/player/list.properties 0 properties
 *
 * @description Provides links to the existing [bitballs/models/player]s. Enables logged
 * in admin users to create, update, and destroy [bitballs/models/player]s.
 *
 * @signature `<player-list {is-admin} />`
 *   Renders a list of [bitballs/models/player] models.
 *
 *   @param {Boolean} is-admin Configures whether or not admin specific
 *   features are enabled.
 *
 *
 * @body
 *
 * To create a `<player-list>` element pass a boolean like [bitballs/app.prototype.isAdmin]:
 *
 * ```
 * <player-list
 *     {is-admin}="app.isAdmin" />
 * ```
 *
 * ## Example
 *
 * @demo public/components/player/list/list.html
 *
 **/
var Component = require("can/component/");
var template = require("./list.stache!");
var CanMap = require("can/map/");

require("bootstrap/dist/css/bootstrap.css!");
require("can/map/define/");
require("can/route/");
require("can/view/href/");

var Player = require("bitballs/models/player");

var ViewModel = exports.ViewModel = CanMap.extend(
/** @prototype */
{
	define: {
		/**
		 * @property {Boolean} bitballs/components/player/list.isAdmin isAdmin
		 * @parent bitballs/components/player/list.properties
		 *
		 * Configures whether or not admin specific features are enabled.
		 **/
		isAdmin: {
			type: 'boolean',
			value: false
		},
		/**
		 * @property {bitballs/models/player} bitballs/components/player/list.players players
		 * @parent bitballs/components/player/list.properties
		 *
		 * A [bitballs/models/player] model List.
		 */
		players: {
			value: function(){
				return Player.getList({orderBy: "name"});
			}
		}
	},
	/**
	 * @function editPlayer
	 *
	 * Selects a [bitballs/models/player] model for editing.
	 *
	 * @param {bitballs/models/player} player
	 *   The player model that will be passed to the `<player-edit>`
	 *   component.
	 *
	 * @return {undefined}
	 */
	editPlayer: function(player){
		this.attr("editingPlayer", player);
	},
	/**
	 * @function removeEdit
	 *
	 * Deselects the [bitballs/models/player] model being edited.
	 *
	 * @return {undefined}
	 */
	removeEdit: function(){
		this.removeAttr("editingPlayer");
	}
});

exports.Component = Component.extend({
	tag: "player-list",
	template: template,
	viewModel: ViewModel
});
