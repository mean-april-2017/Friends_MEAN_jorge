var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  customerSchema = new Schema({
    name: {
      first: {
        type: String,
        required: [true, "this is for something else"],
        trim: true,
      },
      last: {
        type: String,
        required: true,
        trim: true
      },
    },
    phone: {
      type: String,
      validate: [{
        validator: function( number ){
          return /\d{3}-\d{3}-\d{4}/.test( number );
        },
        message: "{VALUE} is not valid phone number"
      },
      {
        validator: function( number ){
          return false;
        },
        message: "{ VALUE } failed this validator"
      },
    ],
    required: [true, "Customer phone number required"]
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE'],
    uppercase: true,
    trim: true,
    default: "MALE"
  },
  age: {
    type: Number,
    min: [18, "Maybe you need to be a little older"],
    max: [85, "You might want to be enjoying your retirement rather than using this site"],
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 32,
    validate: {
      validator: function( value ){
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
      },
      message: "Password failed Validation, you must have at least 1 number, uppercase and special character"
    }
  }
  })
