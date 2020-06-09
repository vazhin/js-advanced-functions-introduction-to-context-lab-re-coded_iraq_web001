// Your code here
let keys = ['firstName','familyName','title','payPerHour', 'timeInEvents', 'timeOutEvents']

function createEmployeeRecord(arr) {
  let i = 0;
  let obj = arr.reduce((accumulator, currentValue) => {
    accumulator[keys[i]] = currentValue;
    i++
    return accumulator
  },{})
  obj[keys[4]] = []
  obj[keys[5]] = []
  return obj
}

function createEmployeeRecords(arr) {
  return arr.reduce((accumulator, currentValue) => {
    accumulator.push(createEmployeeRecord(currentValue))
      return accumulator
    }, [])
}

function addTimeInAndOut(employeeRecordObj, dateTimeString, property, type) {
  let hour = parseInt(dateTimeString.slice(11), 10)
  employeeRecordObj[property] = []
  employeeRecordObj[property].push({
    type: type,
    date: `${dateTimeString.slice(0, 10)}`,
    hour: hour
  })
  return employeeRecordObj
}

function createTimeInEvent(employeeRecordObj, dateTimeString) {
 return addTimeInAndOut(employeeRecordObj, dateTimeString, 'timeInEvents', "TimeIn")
}

function createTimeOutEvent(employeeRecordObj, dateTimeString) {
  return addTimeInAndOut(employeeRecordObj, dateTimeString, 'timeOutEvents', "TimeOut")
}

function hoursWorkedOnDate(employeeRecordObj, dateString) {
  let timeInHour = employeeRecordObj.timeInEvents.find(element => element.date === dateString).hour
  let timeOutHour = employeeRecordObj.timeOutEvents.find(element => element.date === dateString).hour
  return (timeOutHour - timeInHour) / 100
}

function wagesEarnedOnDate(employeeRecordObj, dateString) {
  return hoursWorkedOnDate(employeeRecordObj, dateString) * employeeRecordObj.payPerHour
}

function allWagesFor(employeeRecordObj) {
  let datesArr = employeeRecordObj.timeInEvents.map(element => element.date)
  return datesArr.reduce((accumulator, currentValue) => {
    accumulator += wagesEarnedOnDate(employeeRecordObj, currentValue)
    return accumulator
  }, 0)
}

function findEmployeeByFirstName(employeeRecordsArr, firstName) {
  return employeeRecordsArr.find(element => element.firstName === firstName)
}

function calculatePayroll(employeeRecordsArr) {
  return employeeRecordsArr.reduce((accumulator, currentValue) => {
    accumulator += allWagesFor(currentValue)
    return accumulator
  }, 0)
}
