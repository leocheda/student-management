/*
    Table of Contents:
    1.0 Get Elements
    1.1 Get input elements
    1.2 Get all elements with name attribute
    1.3 Get parent element for rendering data
    2.0 Declarations
    2.1 Declare student list array
    2.2 Declare student ID variable
    3.0 Data Entry Module
    3.1 Form submission
    3.1.1 Capture form
    3.1.2 Add submit button event listener
    3.1.2.1 Prevent default behavior, don't redirect page
    3.1.2.2 Form validation - If content is empty, interrupt and don't add data
    3.1.2.3 Create new object
    3.1.2.4 Append object to array
    3.1.2.5 Reset form input fields
    3.1.2.6 Call render function on submit
    3.1.2.7 Increment student ID to avoid duplication
    4.0 Render Module
    4.1 Render function, needed for both adding and deleting
    4.1.0 Clear tbody first, then render current data in stuList
    4.1.1 Iterate through stuList array
    4.1.1.1 Generate tr (row)
    4.1.1.2 Append element
    5.0 Delete Module
    5.1 tbody click event delegation
    5.1.1 Delete corresponding data in stuList array
    5.1.2 Re-render once
    */
    
    // 1.0 Get Elements
    // 1.1 Get input elements
    const lastName = document.querySelector('.lastName')
    const firstName = document.querySelector('.firstName')
    const age = document.querySelector('.age')
    const gender = document.querySelector('.gender')
    const major = document.querySelector('.major')
    
    // 1.2 Get all elements with name attribute
    const items = document.querySelectorAll('[name]')

    // 1.3 Get parent element for rendering data
    const tbody = document.querySelector('tbody')

    // 2.0 Declarations
    // 2.1 Declare student list array
    const stuList = []
    // 2.2 Declare student ID variable
    let stuId = 1;
    
    // 3.0 Data Entry Module
    // 3.1 Form submission
    // 3.1.1 Capture form
    const stuInfo = document.querySelector('.info')
    // 3.1.2 Add submit button event listener
    stuInfo.addEventListener('submit', function(e) {
      // 3.1.2.1 Prevent default behavior, don't redirect page
      e.preventDefault()
      // 3.1.2.2 Form validation - If content is empty, interrupt and don't add data
      // Iterate through, find empty values
      for(let i = 0; i < items.length; i++) {
        if (items[i].value === '') {
          return alert('Input cannot be empty!')
        }
      } // Don't use forEach because it can't use return to exit the loop

      // 3.1.2.3 Create new object
      const stuObj = {
        stuId: stuId,
        stuLastName: lastName.value,
        stuFirstName: firstName.value,
        stuAge: age.value,
        stuGender: gender.value,
        stuMajor: major.value
      }
      // 3.1.2.4 Append object to array
      stuList.push(stuObj)
      // 3.1.2.5 Reset form input fields
      this.reset()
      // 3.1.2.6 Call render function on submit
      render()
      // 3.1.2.7 Increment student ID to avoid duplication
      stuId++
    })
    
    // 4.0 Render Module
    // 4.1 Render function, needed for both adding and deleting
    const render = () => {
      // 4.1.0 Clear tbody first, then render current data in stuList
      /* Each time render is called, the stuList array is iterated from start to finish,
      so all data in the array will be rendered. Therefore,
      if we don't clear the data rendered in tbody from the last render call,
      all data will be listed consecutively, causing duplication */
      tbody.innerHTML = ''
      // 4.1.1 Iterate through stuList array
      stuList.forEach((element, index) => {
        // 4.1.1.1 Generate tr (row)
        const tableRow = document.createElement('tr')
        tableRow.innerHTML = `
          <td>${stuList[index].stuId}</td>
          <td>${stuList[index].stuLastName}</td>
          <td>${stuList[index].stuFirstName}</td>
          <td>${stuList[index].stuAge}</td>
          <td>${stuList[index].stuGender}</td>
          <td>${stuList[index].stuMajor}</td>
          <td>
            <!-- Add custom id for accurate deletion -->
            <a href="javascript:" data-id=${index}>Delete</a>
          </td>
        `
        // 4.1.1.2 Append element
        // parentElement.appendChild(childElement)
        tbody.appendChild(tableRow)
      });
    }
    
    // 5.0 Delete Module
    // 5.1 tbody click event delegation
    tbody.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        // 5.1.1 Delete corresponding data in stuList array
        // Get the custom attribute of the current element e.target.dataset.id
        stuList.splice(e.target.dataset.id, 1)
        // 5.1.2 Re-render once
        render()
      }
    })
