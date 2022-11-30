const { ObjectID } = require('bson');
const { Schema, model, } = require('mongoose');

// reaction schema acting as a subdocument for the thought schema for the Thought Model to refer to
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectID,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }

    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280, 
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        // refer to previously created reactionSchema
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          getters: true,
          virtuals: true
        },
        id: false,
      }
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema);
module.exports = Thought;