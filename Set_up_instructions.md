**Instructions for setting up the online portion of iWetland**

For a brief overview of the project, please visit the [iWetland webpage](http://ecohydrology.mcmaster.ca/iwetland.html). For more detailed information on the iWetland project, feel free to read the manuscript submitted to *Citizen Science: Theory and Practice* - link to be added.

---

Briefly, iWetland is a community science wetland water level monitoring program, where water level monitoring stations were set up where visitors could text in water level information which would be automatically collated, stored in a database, and displayed online in near real time. For simplicity and ease of interoperability, the iWetland platform uses a suite of Google services, where: (i) Gmail is used to receive the SMS texts, (ii) Google Scripts is used to monitor for incoming texts, parses SMS text information, and updates the database; and (iii) Google Sheets is used to store water level data and plot data which can be shared/linked directly to the iWetland website and updated in real time. To setup the online portion of iWetland, it is recommended that you create a dedicated Google account, but an existing account can be used if so desired.

1. Start by creating a [Google Account](https://www.google.com/account/about/), click *Create an account* and follow the instructions.
2. Set up a [Twilio](https://www.twilio.com/sms) SMS account which will allow users to text in data. For information on how to set up text-to-email forwarding, see [Customizing Twilio](#customizing-twilio)
3. Sign up for a free SenGrid account for easy text-to-email forwarding.
4. Create a filter in your 'iWetland' Gmail account to automatically label texts recevied from Twilio/SendGrid. A filter can be created by clicking the gear icon in the top right corner, then *See all settings*. Click on *Filters and Blocked Addresses*, scroll to the bottom, and click *Create a new filter*. In the *From* and *To* fields, enter your iWetland email address. In the *Subject* field, enter '+\*' without the apostrophes. SendGrid uses the phone number of the SMS text preceded by a '+' as a subject line. Click *Continue*. Check *Apply the label:*, then in the dropdown menu click *New label* and enter *iWetland*. Click *Update filter*.
5. Create a new project in [Google script](https://script.google.com/home). Under *Editor*, create the following scripts: (i) updateDbase; (ii) getWaterLevel; (iii) getSheetNames; and (iv) parseMessage. Copy the code from the .gs files in this GitHub repository to the corresponding script in your new Google script project. Unfortunately, you can't simply upload the .gs files directly.
6. In order to run the script, click *Triggers* (alarm clock icon) on the left hand side. Click *+ Add Trigger*. Select *updateDbase* from the drop-down menu. Select *Time-driven* as the event source. You can choose a time interval of your choosing. We have opted for a 5 minute interval to allow more than enough time for the script to execute and making the database update near real time. Click *Save*.
7. 


### Customizing Twilio
Once you have your Twilio phone number set up, there are several ways of setting up text-to-email forwarding, but the easiest is using [SendGrid](https://sendgrid.com/). Before setting up email forwarding, you will need an API key from SendGrid. To generate an API key in SendGrid, log in to your SendGrid account, and click on *Settings* on the left hand side of the console, then click *API Keys*. Click on *Create API KEY*, select *Full Access*, then click *Create & View*. You will only be shown the API key once, so make sure to copy it down somewhere. To set up the text-to-email function, once you are logged into Twilio, open a new tab in your browser and navigate to the code-exchange page https://www.twilio.com/code-exchange/forward-sms-email.
- Make sure your Twilio phone number is selected in the drop down menu. 
- Enter your Sendgrid API key.
- Enter your 'iWetland' Gmail address in both the 'To' and 'From' fields.
- Click *Deploy my application*.

A nice feature of the Twilio SMS service is that you can set up an auto-reply. Please note that your account will be charged for all outgoing SMS texts. Again, there are a number of ways to do this, but if you have set up the text-to-email as above, then you can make a simple edit to the function that is auto-generated to include an auto-reply. In the Twilio main console, navigate to the *Functions* which can be found on the left hand side of the console. Click on *Services* then click on *forward-message-sendgrid*. If not openned automatically, click on /forward-message-sendgrid under Functions. This will open the code in the right hand pane. Navigate to the bottom of the code and delete the following two lines:
>let twiml = new Twilio.twiml.MessagingResponse();
>
>callback(null, twiml);

Replace with the following:

>// User added callback which auto replies to SMS messages
>
>callback(null, "Custom message")

Click on *Save* and *Deploy All*
