function classData(name, hours, grade) {
    return {
        name: ko.observable(name),
        hours: ko.observable(hours),
        grade: ko.observable(grade),

        remove: function () {
            viewModel.classList.remove(this);
        },
    }
}


function convertGrades(grade) {
    switch (grade) {
        case 'A+': case 'a+': return 4.33;
        case 'A': case 'a': return 4.0;
        case 'A-': case 'a-': return 3.67;
        case 'B+': case 'b+': return 3.33;
        case 'B': case 'b': return 3;
        case 'B-': case 'b-': return 2.67;
        case 'C+': case 'c+': return 2.33;
        case 'C': case 'c': return 2;
        case 'C-': case 'c': return 1.67;
        case 'D': case 'd': return 1;
        case 'F': case 'f': return 0;
        case '': return 0;
        default: alert('Invalid Grade Entry.  All grades must be A, B+, B, C+, C, D, or F.');
    }
}

function convertHours(hours) {
    if (hours == "")
        return 0;
    else
        return parseFloat(hours);
}

function allGPAcon(classList) {

    //Calculate Attempted Hours
    var THrs = 0;
    for (var i = 0; i < classList().length; i++) {
        THrs = THrs + convertHours(classList()[i].hours());
    }
    document.GPACalc2.TotalQHRS.value = THrs;

    //Calculate Quality Points
    var TQpts = 0;
    for (var i = 0; i < classList().length; i++) {
        TQpts = TQpts + (convertGrades(classList()[i].grade()) * convertHours(classList()[i].hours()));
    }
    document.GPACalc2.TotalTQPTS.value = TQpts;


    //Calculate Semester GPA

    if (THrs != 0) {
        var gpa = TQpts / THrs;
        var gpaTruncated = parseInt(gpa * 1000) / 1000;
    }
    else gpaTruncated = 0;

    document.GPACalc2.SemesterGPA2.value = gpaTruncated;

}


var viewModel = {
    classList: ko.observableArray([new classData("", "", ""), new classData("", "", ""), new classData("", "", ""), new classData("", "", ""), new classData("", "", "")]),
    addClass: function () {
        this.classList.push(new classData("", "", ""));
        document.GPAcalc2.numClases.value += 1;
        numClasses += 1;
    },
    calcGPA0: function () {
        allGPAcon(this.classList);
    },
};
ko.applyBindings(viewModel);