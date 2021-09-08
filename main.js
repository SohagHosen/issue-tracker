document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => parseInt(issue.id) !== id)
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();

}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML += 
      `<div class="well">
        <h6>Issue ID: ${id} </h6>
          <p>
            <span class="label label-info"> ${status}</span>
          </p>
          <h3 id="description"> ${status === 'close' ? `<del>${description}</del>` : description} </h3>
          <p>
            <span class="glyphicon glyphicon-time">${severity}</span> 
          </p>
          <p>
            <span class="glyphicon glyphicon-user">${assignedTo}</span>
          </p>
          <button  onclick="setStatusClosed(${id})" class="btn btn-warning">Close</button>
          <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
    </div>`;
  }
}

function setStatusClosed(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));
   const closeIssue = issues.filter(issue => parseInt(issue.id) === id);
   closeIssue[0].status = 'close'
   const currentIssue = issues.filter(issue => parseInt(issue.id) !== id );
   currentIssue.push(closeIssue[0]);
   localStorage.setItem('issues', JSON.stringify(currentIssue));
   fetchIssues()
}