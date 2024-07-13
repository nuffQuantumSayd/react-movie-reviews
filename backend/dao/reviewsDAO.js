import mongoDb from 'mongodb'
const ObjectId = mongoDb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if(reviews) {
            return
        }
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
        } catch (e) {
            console.error(`unable to establish connection handle in reviewDAO: ${e}`)
        }
    }

    //Add movie review
    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: new ObjectId(movieId)
            }
            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`unable to post review: ${e}`)
            return {error: e}
        }
    }

    //Update movie review
    static async updateReview(reviewId, userId, review, date) {
        try {
            const updateResponse = await reviews.updateOne(
                {user_id: userId, _id: new ObjectId(reviewId)},
                {$set: {review: review, date: date}}
            )
            return updateResponse

        } catch (e) {
            console.error(`unable to update review: ${e}`)
            return {error: e}
        }
    }

    //Delete movie review
    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
                user_id: userId,
            })
            return deleteResponse
        } catch (e) {
            console.error(`unable to delete review: ${e}`)
            return {error: e} 
        }
    }
}