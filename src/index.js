import {auth} from 'googleapis'
import assert from 'assert'
import Upload from './upload'
import nodeify from 'nodeify'
const google = require('googleapis')

function Publisher (options) {
  if (!(this instanceof Publisher)) {
    return new Publisher(options)
  }
  assert(options.client_email, 'Missing required parameter client_email')
  assert(options.private_key, 'Missing required parameter private_key')

  this.client = new auth.JWT(
    options.client_email,
    null,
    options.private_key,
    ['https://www.googleapis.com/auth/androidpublisher']
  )
  google.options({ proxy: 'http://www-cache.reith.bbc.co.uk:80', auth: this.client });
}

Publisher.prototype.upload = function upload (apk, params, cb) {
  let up = new Upload(this.client, apk, params)
  return nodeify(up.publish(), cb)
}

export default Publisher
