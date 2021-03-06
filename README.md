Node-BPay
=========

Node.JS BPAY Customer Reference Number Generator and Validator.

Also includes helpful methods for dealing with Luhn Check Digits.

See http://www.bpay.com.au/Business/Small-Medium-Business/Help/BPAY-Services-FAQs.aspx

and http://en.wikipedia.org/wiki/Luhn_algorithm


## Usage

	npm install bpay --save

... then ...

	var bpay = require('bpay');
	var crn = bpay.generateBpayCRN(10); // generates a valid 10 digit CRN
	console.log(bpay.validateBpayCRN(crn)); // true!

## Methods

### `generateBpayCRN(len, prefix)`

Generates a valid BPay Customer Reference Number.

A BPay CRN is a 2-20 digit number with the last digit a luhn check digit.

#### Arguments:

* `len` (`String` or `Number`) - Length of number to generate (defaults to 10)
* `prefix` (`String` or `Number`) - Prefix to use (optional)

#### Returns:

* `String` - The new CRN


### `validateBpayCRN(input)`

Validates a BPay Customer Reference Number.

#### Arguments:

* `input` (`String` or `Number`) - The CRN to validate

#### Returns:

* `Boolean` - Whether the CRN is valid


### `getLuhnCheckDigit(input)`

Calculates the Luhn check digit for the input.

#### Arguments:

* `input` (`String` or `Number`) - The input to generate a check digit for

#### Returns:

* `String` - The check digit



### `validateLuhnCheckDigit(input)`

Validates the Luhn check digit in the input.

#### Arguments:

* `input` (`String` or `Number`) - The input to validate

#### Returns:

* `Boolean` - Whether the check digit is valid

