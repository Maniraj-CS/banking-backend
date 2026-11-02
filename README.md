

# This is offcial SafePay Backend

## Auth Feature
1) register 
    route : /api/v1/auth/register
    fild require : email , password , name
    feature: if user login with this fild then after register successfully and receive message from safepay i.e welcome to SafePay
    responce: userid , name , email and token
2) login
    route : /api/v1/auth/login
    fild require : email , password 
    feature: for login again safepay you need email and password again
    responce: userid , name , email and token

3) logout
    route : /api/v1/auth/logout
    responce: token remove from cookies

## Account Feature



### Some important featur : 
  