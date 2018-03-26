# emergency-data-website
This website was built for the final round of the Capital One Software Engineering Summit 2018. 

[Here](https://katherinekolman.github.io/emergency-data-website) is a link to the deployed website, best viewed in Firefox/Chrome.

## Project Goals

The challenge asked us to complete three deliverables:

1. Data Visuals: Display or graph 3 metrics or trends from the data set that are interesting to you.

    For the first deliverable, I initially decided to create 3 graphs: 
    - The first one shows the average resolution time for each incident type, or in other words, the average amount of time (in minutes) for an emergency responder to become available again after arriving onscene. To get this information, I sorted the incidents into their respective call type. Then, I subtracted the onscene timestamp from the available timestamp to get the amount of minutes the responders were there. Finally, I took the average of each of the datasets.
    - The second one is a doughnut chart displaying the number of occurrences of each incident in total. For this, I simply parsed the CSV file and sorted it by call type and got the numbers from there. I decided to hardcode the values in this instance just to make it a bit easier to load.
    - The third is a graph that shows the number of occurrences of an incident over time. Again, with this graph, I sorted the data into call type. Then, I further sorted the data into 24 time categories, with intervals at the half-hour mark. For example, I considered incidents with times between 3:30 PM and 4:30 PM to have occurred at 4 PM, and so on. I didn't want to just focus on a single incident type, however, so I included the ability for the user to change the call type of the data displayed.
   
    I also decided to include a toggleable map that shows the locations of each incident type.
    
2. Given an address and time, what is the most likely dispatch to be required?

    For the second deliverable, I thought it would be the easiest to make use of the Google Maps API and let that take care of converting addresses to latitude and longitude coordinates. I compared the latitude and longitude of the user-inputted address to the data provided in the CSV file by searching for incidents within a one mile radius. If it didn't find anything, it would continue searching with a larger radius up to 16 miles; by then, I thought it would be safe to assume that the location wasn't in San Francisco. 
    
    With the location data, I looked at the times of those incidents and looked for incidents that occurred within a two hour range, and like with the location data, I increased the range up to 24 hours. Finally, I looked through the data and found which unit was dispatched the most. As a bonus, I also looked at the call type and found which emergency occurred the most. 
    
3. Which areas take the longest time to dispatch to on average? How can this be reduced?
    
    For the last deliverable, I decided to create a graph showing the average dispatch time for each zipcode. I then took the three zicodes with the highest dispatch times and analyzed potential reasons for why times could be higher there rather than other places. Finally, I created a heatmap showing the locations of all incidents over the city and explained overall how times could be reduced.
    
___
## Takeaways
For this project, I decided to use Javascript along with the [jQuery](https://jquery.com/) library just to make things a little easier and cleaner. I hadn't touched Javascript or HTML/CSS for months, so initially, I had no idea how to integrate some of the features I wanted. However, after taking the time to read through some documentation (and also discovering the [Google Maps API](https://developers.google.com/maps/documentation/javascript/)) the looming 2.5 week deadline didn't seem so bad. 

*A few takeaways:*
- I had to learn how to deal with the asynchronous nature of Google Maps. It was really annoying at first (and caused a lot of headaches), but dealing with this has definitely improved my understanding of how websites actually work.
- I realize that parsing the data on page load isn't the most performance-friendly way of going about it, nor is storing the data on the client-side. I definitely would have used an external database to deal with the data, but unfortuntely, due to my lack of experience using databases and lack of time, I decided not to implement this.
- I did decide to learn, however, jQuery. It seemed a lot easier to use and learn, and not to mention it has some neat methods for DOM manipulation that proved very helpful with animations. I also think the code looks a little cleaner (a minor reason, but a plus nonetheless). 

Overall, this challenge allowed me to brush up on my JavaScript and HTML/CSS skills, and I think this was a very good exercise in data manipulation and UI design.

___
## Potential Improvements
Ways I could have improved the website, given more time:
- __*Responsiveness*__. I have to admit, I didn't even think about this... until the day of the deadline. I made the huge mistake of using pixels for element widths and heights instead of something like percentages, so the website doesn't look great on computers with resolutions lower than the standard HD resolution (1920 x 1080). I also could have used a library like [Bootstrap](https://getbootstrap.com/) to improve responsiveness for mobile.
- __*Usage of a database*__. I think this is also another major improvement I could make to this. This would improve performance, and probably would make data retrieval a lot easier.
- __*Removing global variables*__. I tried to adhere to good practices when making the website, but I couldn't really avoid using global variables, especially in regards to the stuff for Google Maps. If I were to refactor this, I would try to limit the scope of these variables.
___
## Resources
__Libraries__
- [jQuery](https://jquery.com/)
- [Chart.js](https://github.com/chartjs/Chart.js)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/)
- [MarkerClusterer](https://github.com/googlemaps/v3-utility-library/tree/master/markerclusterer) 

__Languages__
- JavaScript
- HTML/CSS
