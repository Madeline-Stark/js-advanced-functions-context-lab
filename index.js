/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArrays){
    return employeeArrays.map(function(employee){
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(dateStamp){
    // test:
    // let updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400")
    // let newEvent = updatedBpRecord.timeInEvents[0]

    //not passing in employeeRecord, will need to access with this

    //create an object
   let [date, hour] = dateStamp.split(' ')
    const clockIn = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    }
    //add the object to timeInEvents
    this.timeInEvents.push(clockIn)
    return this
}

function createTimeOutEvent(dateStamp){
    //create an object
   let [date, hour] = dateStamp.split(' ')
    const clockOut = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    }
    //add the object to timeInEvents
    this.timeOutEvents.push(clockOut)
    return this
}

function hoursWorkedOnDate(date){
    //test:
    // expect(hoursWorkedOnDate.call(cRecord, "44-03-15")).to.equal(2)

    //find the timeInEvent in employeeRecord's timeInEvents
    const timeIn = this.timeInEvents.find(function(timeIn){
        return timeIn.date === date
    })
    //same for timeout
    const timeOut = this.timeOutEvents.find(function(timeOut){
        return timeOut.date === date
    })

    //using that, we then can calculate hours worked
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100

    return hoursWorked
}

function wagesEarnedOnDate(date){
    //  expect(wagesEarnedOnDate.call(cRecord, "44-03-15")).to.equal(54)

    return hoursWorkedOnDate.call(this, date) * this.payPerHour
    //changed hoursWorkedOnDate to only accept one arg, so need to use call
}

function findEmployeeByFirstName(srcArray, firstName){
    //test 
    //passes in employee records and name
    // findEmployeeByFirstName(emps, "Loki")

    return srcArray.find(function(employee){
        return employee.firstName === firstName
    })
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce(function(accumulator, employee){
        return accumulator + allWagesFor.call(employee) //allWagesFor doesnt take arg, uses this
    }, 0)
}