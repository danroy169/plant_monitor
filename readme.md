# Plant Monitor

An application designed to monitor the soil moisture of a potted plant(s) as well as the ambient air temperature and ambient air humidity. 

Features include a email notification system, and a interactive web UI. The web UI allows the user to see current and historical data, and also
allows the user to set configurations.

Microservices include:
    - MQTT Broker
    - Emailer
    - Gateway
    - SSE-Gateway
    - Metric
    - Notification
    - Moisture Sensor
    - Temp/Humid Sensor
    - Threshold

Right now it's setup as one big mono-repo, but eventually the goal is to seperate all the services and the website out into their own. Mono-repo was chosen to start
just to make things easier on me during development. 

To run:
    - Run .\app\src\app.js in node
    - Run .\site\host.js in node
    - Emailer won't connect at work, but usually ran in it's own process as well at .\services\emailer\src\service_email.py


