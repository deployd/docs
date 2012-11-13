<!--{
  title: 'Email',
  tags: ['resource type', 'module', 'email'],
  description: 'Send emails from clients or during events.'
}-->

## Email Resource

This custom resource type allows you to send an email to your users.

The Email resource is built on the [Nodemailer](https://github.com/andris9/Nodemailer) module for Node.js; much of the documentation on this page is taken from their README.

### Installation

In your app's root directory, type `npm install dpd-email` into the command line. This should create a `dpd-email` directory in your app's `node_modules` directory.

See [Installing Modules](../installing-modules.md) for details.

### Configuration

Before using the email resource, you must go to its Dashboard page and configure it.

These settings are required:

- `host`: The hostname of your SMTP provider.
- `port`: The port number of your SMTP provider. Defaults to 25; 587 is also common.
- `ssl`: If checked, use SSL to communicate with your SMTP provider. Unneeded for port 587; as it will automatically upgrade to a secure connection.
- `username`: The SMTP username for your app.
- `password`: The SMTP username for your app.

These settings are optional:

- `defaultFromAddress`: A "from" email address to provide by default. If this is not provided, you will need to provide this address in every request.
- `internalOnly`: If checked, only allow internal requests (such as those from events) to send emails. Recommended for security.
- `productionOnly`: If checked, attempting to send an email in the `development` environment will simply print it to the Deployd console. 

### Usage

To send an email, call `dpd.email.post(options, callback)` (replacing `email` with your resource name). The `options` argument is an object:

- `from`: The email address of the sender. Required if `defaultFromAddress` is not configured. All e-mail addresses can be plain (`sender@server.com`) or formatted (`Sender Name <sender@server.com>`)
- `to`: Comma separated list of recipients e-mail addresses that will appear on the To: field
- `cc`: Comma separated list of recipients e-mail addresses that will appear on the Cc: field
- `bcc`: Comma separated list of recipients e-mail addresses that will appear on the Bcc: field
- `subject`: The subject of the e-mail.
- `text`: The plaintext version of the message
- `html`: The HTML version of the message

### Example Usage

    // On POST /users

    dpd.email.post({
      to: this.email,
      subject: "MyApp registration",
      text: this.username + ",\n\n" +
            "Thank you for registering for MyApp!"
    }, function() {});