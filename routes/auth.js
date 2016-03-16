
/*

--------------------------------------------------------------------------------------------------------------------------------------------
Name of Module: Authentication
Purpose:Authentication for Cast Iron
Input Parameters:
Outut Parameters:

Change History Log
--------------------------------------------------------------------------------------------------------------------------------------------
Date        User        Change Ref. #       Purpose
12/23/2014  IBM         Initial             Initial
--------------------------------------------------------------------------------------------------------------------------------------------
*/

exports.getAgreement = function(url,def){
    return {
        method: 'get',
        url: url,
        ratingtype:def
    };
};exports.getplaces = function(url,def){
    return {
        method: 'get',
        url: url
    };
};