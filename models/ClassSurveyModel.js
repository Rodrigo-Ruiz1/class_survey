const db = require('./conn');

class ClassSurveyModel {
    constructor(id, topic_name,  topic_score) {
        this.id = id;
        this.topic.name = topic_name;
        this.topic.score = topic_score;
    }

    static async getAllTopicData() {
        try {
            const response = await db.any(
                `SELECT topic_score, topic_name, ranking_title FROM topics
                    JOIN rankings
                    ON topics.topic_score = rankings.id
                ORDER BY topics.topic_name;`
            )
            return response;
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }

    static async getAllRankings() {
        try {
            const response = await db.any(
                `SELECT * FROM rankings;`
            )
            return response;
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }

    static async updateRanking(topic, topic_score) {
        try {
            const response = await db.result(
                `UPDATE topics SET topic_score = $1 WHERE topic_name = $2;`, [topic_score, topic]
            );
            return response;
        } catch (error) {
            console.error('ERROR: ', error)
            return error;
        }
    }

}

module.exports = ClassSurveyModel;