/* jshint esversion: 8 */

class Webhook {
  /**
   * A new webhook api object.
   * @param {object} self is `this` from index.js
   * @constructor
   */
  constructor (self) {
    this.parent = self.parent
    this._sendRequest = self._sendRequest
    this._doRequest = self._doRequest
    this._checkKey = self._checkKey
  }

  /**
   * activates a webhook endpoint
   * @param {string} id the webhook id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  activate (id, callback) {
    this._doRequest(`private/webhook_endpoints/${id}/activate`, 'POST').then(function (response) {
      if (response && response.data) callback(response.data.data)
    })
  }

  /**
   * creates or updates a webhook subscription
   * @param {string} webhookID id of the webhook
   * @param {string} eventID id of the event (campaign, team campaign, fundraising event) to track
   * @param {Object} payload JSON array {event_types: [<TYPES>]} of events to subscribe to (see Tiltify API ref)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  subscribe (webhookID, eventID, payload, callback) {
    this._doRequest(`private/webhook_endpoints/${webhookID}/webhook_subscriptions/${eventID}`, 'PUT', payload).then(function (response) {
      if (response && response.data) callback(response.data.data)
    })
  }

  /**
   * list relay keys by webhook id
   * @param {string} id the webhook id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  listRelays (id, callback) {
    this._sendRequest(`private/webhook_relays/${id}/webhook_relay_keys`, callback)
  }

  /**
   * create a new webhook relay key
   * @param {string} id webhook relay id
   * @param {Object} payload optional payload to send, json with id and metadata
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  createRelay (id, payload, callback) {
    this._doRequest(`private/webhook_relays/${id}/webhook_relay_keys`, 'POST', payload).then(function (response) {
      if (response && response.data) callback(response.data.data)
    })
  }

  /**
   * return webhook relay key by id
   * @param {string} webhookRelayID webhook relay id
   * @param {string} webhookRelayKeyID webhook relay key id
   */
  getRelayKey (webhookRelayID, webhookRelayKeyID, callback) {
    this._doRequest(`private/webhook_relays/${webhookRelayID}/webhook_relay_keys/${webhookRelayKeyID}`).then(function (response) {
      if (response && response.data) callback(response.data.data)
    })
  }
}

module.exports = Webhook
