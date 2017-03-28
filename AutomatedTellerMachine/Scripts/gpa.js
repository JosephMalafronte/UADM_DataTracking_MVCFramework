<!--

function CalcSem()
{
    var hours1 = convertHours(document.GPACalc.Hours1.value);
    var hours2 = convertHours(document.GPACalc.Hours2.value);
    var hours3 = convertHours(document.GPACalc.Hours3.value);
    var hours4 = convertHours(document.GPACalc.Hours4.value);
    var hours5 = convertHours(document.GPACalc.Hours5.value);
    var hours6 = convertHours(document.GPACalc.Hours6.value);
    var hours7 = convertHours(document.GPACalc.Hours7.value);
    var hours8 = convertHours(document.GPACalc.Hours8.value);
    var hours9 = convertHours(document.GPACalc.Hours9.value);
    var hours10 = convertHours(document.GPACalc.Hours10.value);


    THrs = hours1 + hours2 + hours3 + hours4 + hours5 + hours6 + hours7 + hours8 + hours9 + hours10;


    document.GPACalc.TotalQHrs.value = THrs; 


    var grades1 = convertGrades(trim(document.GPACalc.Grade1.value));
    var grades2 = convertGrades(trim(document.GPACalc.Grade2.value));
    var grades3 = convertGrades(trim(document.GPACalc.Grade3.value));
    var grades4 = convertGrades(trim(document.GPACalc.Grade4.value));
    var grades5 = convertGrades(trim(document.GPACalc.Grade5.value));
    var grades6 = convertGrades(trim(document.GPACalc.Grade6.value));
    var grades7 = convertGrades(trim(document.GPACalc.Grade7.value));
    var grades8 = convertGrades(trim(document.GPACalc.Grade8.value));
    var grades9 = convertGrades(trim(document.GPACalc.Grade9.value));
    var grades10 = convertGrades(trim(document.GPACalc.Grade10.value));
	

    var TQPts = (hours1 * grades1) + (hours2 * grades2) + (hours3 * grades3) + (hours4 * grades4) + (hours5 * grades5) + (hours6 * grades6) + (hours7 * grades7) + (hours8 * grades8) + (hours9 * grades9) + (hours10 * grades10);

    document.GPACalc.TotalQPts.value = TQPts;

    var gpa = TQPts / THrs;
    var gpaTruncated = parseInt(gpa * 1000) / 1000;
    document.GPACalc.SemesterGPA.value = gpaTruncated;
}

function convertHours(hours)
{
    if (hours == "")
        return 0;
    else
        return parseFloat(hours);
}

function convertGrades(grade)
{
    switch (grade)
    {
        case 'A+': case 'a+': return 4.33;
        case 'A': case 'a': return 4.0;
        case 'A-': case 'a-': return 3.67;
        case 'B+': case 'b+': return 3.33;
        case 'B': case 'b': return 3;
        case 'B-': case 'b-': return 2.67;
        case 'C+': case 'c+': return 2.33;
        case 'C': case 'c': return 2;
        case 'C-': case'c': return 1.67;
        case 'D': case 'd': return 1;
        case 'F': case 'f': return 0;
        case '': return 0;
        default: alert('Invalid Grade Entry.  All grades must be A, B+, B, C+, C, D, or F.');
    }
}

function CalcOverall()
{
    CalcSem();

    var preGPA = parseFloat(document.GPACalc.PrevGPA.value); 
    var preHrs = parseFloat(document.GPACalc.PrevHrs.value); 
    var semHrs = parseFloat(document.GPACalc.TotalQHrs.value); 
    var semQPts = parseFloat(document.GPACalc.TotalQPts.value); 

    var gpaOverall = ((preGPA * preHrs) + semQPts) / (semHrs + preHrs);
    var gpaOverallTruncated = parseInt(gpaOverall * 1000) / 1000;

    document.GPACalc.OverallGPA.value = gpaOverallTruncated;
}

function trim(inputString) {
    // Code borrowed from www.breakingpar.com
    // Removes leading and trailing spaces from the passed string. Also removes
    // consecutive spaces and replaces it with one space. If something besides
    // a string is passed in (null, custom object, etc.) then return the input.
    if (typeof inputString != "string") { return inputString; }
    var retValue = inputString;
    var ch = retValue.substring(0, 1);
    while (ch == " ") { // Check for spaces at the beginning of the string
        retValue = retValue.substring(1, retValue.length);
        ch = retValue.substring(0, 1);
    }
    ch = retValue.substring(retValue.length-1, retValue.length);
    while (ch == " ") { // Check for spaces at the end of the string
        retValue = retValue.substring(0, retValue.length-1);
        ch = retValue.substring(retValue.length-1, retValue.length);
    }
    while (retValue.indexOf("  ") != -1) { // Note that there are two spaces in the string - look for multiple spaces within the string
        retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length); // Again, there are two spaces in each of the strings
    }
    return retValue; // Return the trimmed string back to the user
} 

// -->