# SIH2k25 – Real-Time Bus Tracking System with Voice Commands

## Project Overview  
SIH2k25 is a web-based application that helps users track buses in real time and navigate the platform using voice commands. It is designed for Tier-2 and semi-urban regions, with a focus on accessibility, low-bandwidth compatibility, and ease of use for first-time users.

## Key Features  
- Real-time bus location tracking using GPS  
- Voice command support for page navigation and actions  
- Demo command that plays a video tutorial for new users  
- Map-based route visualization  
- Multilingual support planned for wider accessibility  
- Optimized for low-bandwidth environments

## Technologies Used  
- **Frontend:** HTML, CSS, JavaScript  
- **Voice Recognition:** Web Speech API  
- **Backend:** Spring Boot (Java)  
- **Map Integration:** Google Maps API or Leaflet.js  
- **Database:** MySQL / MongoDB (as applicable)

## Accessibility and Regional Support  
Built for Tier-2 cities and semi-urban areas, the system is optimized to work even with limited internet connectivity. Multilingual support is planned to help users interact in their preferred language. The voice command feature makes the app more inclusive for users with limited digital experience.

## Demo Feature  
Users can say "Demo" to trigger a video walkthrough that explains how to use the app. This helps new users understand the system quickly and comfortably.

## How to Run

### Backend (Spring Boot)
1. Clone the repository  
   ```
   git clone https://github.com/SANDARBH-SINGH/SIH2K25.git
   ```
2. Open the project in your preferred IDE (e.g., IntelliJ, Eclipse)  
3. Configure database settings in `application.properties`  
4. Run the Spring Boot application  
   ```
   mvn spring-boot:run
   ```

### Frontend
1. Navigate to the frontend folder  
2. Open `index.html` in your browser  
3. Use voice commands to interact with the app

## Sample Voice Commands  
- "Track my bus" – Opens live tracking page  
- "Show routes" – Displays available bus routes  
- "Contact support" – Opens help page  
- "Go home" – Returns to homepage  
- "Demo" – Plays tutorial video

## Contributors  
- M N Chaithanya – Developed the backend using Spring Boot and implemented GPS tracking logic for real-time bus location updates
- Jammi Vyshnavi – Integrated voice command functionality, designed the user interface, and built the initial prototype for usability testing
- V Ram Charan – Handled map integration, supported database setup, and assisted in testing and deployment
- Sujana – Contributed to documentation, planned accessibility features, and supported frontend development


## Future Enhancements  
- Add support for regional languages like Telugu and Hindi  
- Enhancing low-bandwidth functionality for areas with poor connectivity  
- Admin dashboard for route and bus management

## License  
This project is open-source under the MIT License.

