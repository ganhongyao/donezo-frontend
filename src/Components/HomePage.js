import React from 'react';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate()  : objToday.getDate() + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear();
var today = dayOfWeek + " " + dayOfMonth+ " " + curMonth + ", " + curYear;

export default function ComponentName() {
    const classes = useStyles();

    return (
        <div>
            {today}
        </div>
    )
}