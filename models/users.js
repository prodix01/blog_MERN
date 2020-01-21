const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {

        method: {
            type: String,
            enum: ["local", "google", "facebook"],
            require: true
        },

        local: {
            name : {
                type : String
            },
            email : {
                type : String,
                lowercase: true
            },
            password : {
                type : String
            },
            avatar : {
                type : String
            }
        },

        facebook: {
            id: {
                type: String
            },
            name: {
                type: String
            },
            email: {
                type: String,
                lowercase: true
            },
            avatar: {
                type: String
            }


        }



    },
    {
        timestamps: true
    }

);


userSchema.pre("save", async function (next) {
    try {
        if (this.method !== "local") {
            next();
        }
        console.log("entered");
        // 아바타 자동생성
        const avatar = await gravatar.url(this.local.email, {
            s : "200",
            r : "pg",
            d : "mm"
        });

        this.local.avatar = avatar;

        // 패스워드 암호화
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        this.local.password = passwordHash;
        console.log("exited");
        next();


    }
    catch (error) {
        next(error)
    }
});



module.exports = mongoose.model("user", userSchema);