const PELOTON_AUTH_URL = 'https://api.onepeloton.com/auth/login';

function authorize(username, password) {
  if ((username == null) || (password == null)) {
    throw 'Username or password not set. Please make sure to set the username and password in the Properties sheet';
  }

  // Get the user_id and cookie needed to invoke the API to get the workout data
  let payload =
  {
    "username_or_email": username,
    "password": password
  };

  let options =
  {
    "method": "POST",
    "contentType": "application/json",
    'muteHttpExceptions': true,
    "payload": JSON.stringify(payload)
  };

  let authResult = UrlFetchApp.fetch(PELOTON_AUTH_URL, options);
  let rc = authResult.getResponseCode();

  // Should check for other responses, otberwise will get misleading error
  if (rc == 401) {
    throw 'Invalid credentials';
  }

  // Needs the peloton_session_id cookie for future invocations
  let cookies = authResult.getAllHeaders()['Set-Cookie'];
  let cookie = cookies.filter(function (c) {
    return c.startsWith('peloton_session_id');
  })[0];

  // And some APIs will need the user_id
  let authResponse = JSON.parse(authResult.getContentText());
  let userId = authResponse.user_id;

  return {
    userId: userId,
    cookie: cookie
  };
}

function getPowerzoneType(title) {
  if (title.includes('FTP Test')) {
    return 'FTP Test';
  }
  
  if (title.includes('Power Zone')) {
    if (title.includes('Endurance')) {
      return 'PZE';
    } 
    
    if (title.includes('Max')) {
      return 'PZ Max';
    } 
    
    return 'PZ';
  }
  
  return 'Other';
}

