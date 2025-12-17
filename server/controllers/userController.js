    const { db } = require('../config/db');

    exports.saveProfile = async (req, res) => {
        const { age, gender, height, weight, activity_level, goal, dietary_pref, allergies } = req.body;
        const userId = req.user.id;

        try {
        
            const [existing] = await db.query('SELECT * FROM profiles WHERE user_id = ?', [userId]);

            if (existing.length > 0) {
            
                await db.query(
                    `UPDATE profiles SET age=?, gender=?, height=?, weight=?, activity_level=?, goal=?, dietary_pref=?, allergies=? WHERE user_id=?`,
                    [age, gender, height, weight, activity_level, goal, dietary_pref, JSON.stringify(allergies), userId]
                );
            } else {
            
                await db.query(
                    `INSERT INTO profiles (user_id, age, gender, height, weight, activity_level, goal, dietary_pref, allergies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [userId, age, gender, height, weight, activity_level, goal, dietary_pref, JSON.stringify(allergies)]
                );
            }

            res.json({ message: 'Profile Saved Successfully!' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    };


    exports.getProfile = async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM profiles WHERE user_id = ?', [req.user.id]);
            
            if (rows.length === 0) {
                return res.status(404).json({ message: 'No profile found' });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    };


    
    exports.deleteAccount = async (req, res) => {
        const userId = req.user.id;
        try {
          
            await db.query('DELETE FROM profiles WHERE user_id = ?', [userId]);
          
            await db.query('DELETE FROM users WHERE id = ?', [userId]);
            
            res.json({ message: 'Account Deleted Successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    };