const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    },
    toId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['ignored','interested', 'accepted', 'rejected'],
            message: `{VALUE} - Status is either: pending, accepted, rejected`
        }
    }

},{
    timestamps: true
});

//compound index
connectionRequestSchema.index({ fromId: 1, toId: 1 });

const ConnectionRequestModel = mongoose.model('ConnectionRequest', connectionRequestSchema);
module.exports = ConnectionRequestModel;