from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors module
import mysql.connector
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Configure MySQL connection
db_config = {
    'host': 'localhost',
    'port': 3306,  
    'user': 'root',
    'password': '',
    'database': 'portfolio'
}

@app.route('/save_contact', methods=['POST'])
def save_contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    try:
        # Connect to MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Execute SQL INSERT statement
        sql = "INSERT INTO contact (name, email, subject, message) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (name, email, subject, message))

        # Commit changes and close connection
        conn.commit()
        conn.close()

        return jsonify({'success': True})

    except mysql.connector.Error as error:
        print(f"Error: {error}")
        print("Error traceback:", traceback.format_exc())  # Print detailed traceback
        return jsonify({'success': False, 'error': str(error)})

    except Exception as e:
        # Handle errors and return failure response
        return jsonify({'success': False, 'error': str(e)})
if __name__ == '__main__':
    app.run(debug=True)
