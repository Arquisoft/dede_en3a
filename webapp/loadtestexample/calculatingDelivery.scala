package dede

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class firstSimulation extends Simulation {

  private val httpProtocol = http
    .baseUrl("https://dede-en3a.web.app/")
    .inferHtmlResources(AllowList(), DenyList())
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"Cache-Control" -> "max-age=0",
  		"If-Modified-Since" -> "Thu, 21 Apr 2022 16:12:29 GMT",
  		"If-None-Match" -> """"65b98219bbddf7272c34761878d0ac75379b22bc416fb6881403d7fe46c08efb-br"""",
  		"Sec-Fetch-Dest" -> "document",
  		"Sec-Fetch-Mode" -> "navigate",
  		"Sec-Fetch-Site" -> "none",
  		"Sec-Fetch-User" -> "?1",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
  		"Cache-Control" -> "max-age=0",
  		"If-Modified-Since" -> "Thu, 21 Apr 2022 16:12:29 GMT",
  		"If-None-Match" -> """"32c3001901aff4cd33aa832a2b66949fadb07f1a570aaedebd66a54fb1a9259c-br"""",
  		"Sec-Fetch-Dest" -> "script",
  		"Sec-Fetch-Mode" -> "no-cors",
  		"Sec-Fetch-Site" -> "same-origin"
  )
  
  private val headers_2 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"Cache-Control" -> "max-age=0",
  		"Sec-Fetch-Dest" -> "image",
  		"Sec-Fetch-Mode" -> "no-cors",
  		"Sec-Fetch-Site" -> "same-origin"
  )
  
  private val headers_3 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"Cache-Control" -> "max-age=0",
  		"If-Modified-Since" -> "Thu, 21 Apr 2022 16:12:29 GMT",
  		"If-None-Match" -> """"2022d6489f7102b2da01fd51464a549a8a7efc600c7de7b772bb83e48f4c048c-br"""",
  		"Sec-Fetch-Dest" -> "image",
  		"Sec-Fetch-Mode" -> "no-cors",
  		"Sec-Fetch-Site" -> "same-origin"
  )
  
  private val headers_4 = Map(
  		"Content-Type" -> "application/json",
  		"Origin" -> "https://dede-en3a.web.app",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"X-Client-Version" -> "Firefox/JsCore/9.6.8/FirebaseCore-web",
  		"X-Firebase-gmpid" -> "1:344724226999:web:1aef51b515c7983e08de32"
  )
  
  private val headers_5 = Map(
  		"Origin" -> "https://dede-en3a.web.app",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_6 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"Sec-Fetch-Dest" -> "image",
  		"Sec-Fetch-Mode" -> "no-cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_11 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"Cache-Control" -> "max-age=0",
  		"If-Modified-Since" -> "Fri, 01 Apr 2022 09:26:46 GMT",
  		"Sec-Fetch-Dest" -> "image",
  		"Sec-Fetch-Mode" -> "no-cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_13 = Map(
  		"Accept" -> "text/turtle",
  		"Origin" -> "https://dede-en3a.web.app",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_14 = Map(
  		"Access-Control-Request-Headers" -> "authorization,content-type",
  		"Access-Control-Request-Method" -> "POST",
  		"Origin" -> "https://dede-en3a.web.app",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site"
  )
  
  private val headers_15 = Map(
  		"Content-Type" -> "application/json",
  		"Origin" -> "https://dede-en3a.web.app",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "cross-site",
  		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2NzNkM2M5NDdhZWIxOGI2NGU1OGUzZWRlMzI1NWZiZjU3NTI4NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGVkZS1lbjNhIiwiYXVkIjoiZGVkZS1lbjNhIiwiYXV0aF90aW1lIjoxNjUwNTU4NTk2LCJ1c2VyX2lkIjoiaUl2alpEU3drVVQwaHVOSnZ6bHBxbnpmZVJ1MSIsInN1YiI6ImlJdmpaRFN3a1VUMGh1Tkp2emxwcW56ZmVSdTEiLCJpYXQiOjE2NTA1NTg1OTYsImV4cCI6MTY1MDU2MjE5NiwiZW1haWwiOiJtYXJ0aW5iZWx0cmFuZGlhekBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWFydGluYmVsdHJhbmRpYXpAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Z6w3YrqjRk3aPRFBxmdCJX0uxQE22wjXIFDJuohEqP5e3Oc6AFnD3y1I6phpZbdNvTWTBLpmtqjiSBpUVYok9Kp-nrtj_U3r_1CX_RX8Apzh5dVlw36BZrayFsUON0ivVLgtxzJ-ffmejgfzeY00PT7gvOGouNWw-4SRkf0NPy7MrJDmahE-SPJJ48x2dZjaVX8iwTnBMMqT1cr_8_8GvXAbYQM1BKaJgg3l5i2eVkQpe9cJdNy1gWGTMjy7VhKKST6C3UoZ78D2jbt7Wv90sEpSu2JnFaAS55TZOYZMRZOxx1VHWHvUNqJtjPiPuwHsJ0ABvt3BGEfRVUyubsjguw"
  )
  
  private val uri1 = "https://us-central1-dede-en3a.cloudfunctions.net/calculateDeliveryOnCall"
  
  private val uri2 = "https://identitytoolkit.googleapis.com/v1/accounts:lookup"
  
  private val uri3 = "https://images.pexels.com/photos/296323/pexels-photo-296323.jpeg"
  
  private val uri4 = "https://logodix.com/logo/1288191.png"
  
  private val uri5 = "https://dede-en3a.web.app"
  
  private val uri7 = "https://carlosgarriga12.solidcommunity.net/profile/card"

  private val scn = scenario("firstSimulation")
    .exec(
      http("request_0")
        .get(uri5 + "/shop")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get(uri5 + "/static/js/main.cc6de151.js")
            .headers(headers_1),
          http("request_2")
            .get(uri5 + "/static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg")
            .headers(headers_2),
          http("request_3")
            .get(uri5 + "/static/media/pexels-photo-401107(1).c17cd6da40632bbb4e9d.jpg")
            .headers(headers_3),
          http("request_4")
            .post(uri2 + "?key=AIzaSyAsJIeaL0YAdv0QJG7CuXuR26grYco5-p0")
            .headers(headers_4)
            .body(RawFileBody("dede/firstsimulation/0004_request.json")),
          http("request_5")
            .post("/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fdede-en3a%2Fdatabases%2F(default)&VER=8&RID=60489&CVER=22&X-HTTP-Session-Id=gsessionid&%24httpHeaders=X-Goog-Api-Client%3Agl-js%2F%20fire%2F9.6.8%0D%0AContent-Type%3Atext%2Fplain%0D%0AX-Firebase-GMPID%3A1%3A344724226999%3Aweb%3A1aef51b515c7983e08de32%0D%0AAuthorization%3ABearer%20eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2NzNkM2M5NDdhZWIxOGI2NGU1OGUzZWRlMzI1NWZiZjU3NTI4NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGVkZS1lbjNhIiwiYXVkIjoiZGVkZS1lbjNhIiwiYXV0aF90aW1lIjoxNjUwNTU4NTk2LCJ1c2VyX2lkIjoiaUl2alpEU3drVVQwaHVOSnZ6bHBxbnpmZVJ1MSIsInN1YiI6ImlJdmpaRFN3a1VUMGh1Tkp2emxwcW56ZmVSdTEiLCJpYXQiOjE2NTA1NTg1OTYsImV4cCI6MTY1MDU2MjE5NiwiZW1haWwiOiJtYXJ0aW5iZWx0cmFuZGlhekBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWFydGluYmVsdHJhbmRpYXpAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Z6w3YrqjRk3aPRFBxmdCJX0uxQE22wjXIFDJuohEqP5e3Oc6AFnD3y1I6phpZbdNvTWTBLpmtqjiSBpUVYok9Kp-nrtj_U3r_1CX_RX8Apzh5dVlw36BZrayFsUON0ivVLgtxzJ-ffmejgfzeY00PT7gvOGouNWw-4SRkf0NPy7MrJDmahE-SPJJ48x2dZjaVX8iwTnBMMqT1cr_8_8GvXAbYQM1BKaJgg3l5i2eVkQpe9cJdNy1gWGTMjy7VhKKST6C3UoZ78D2jbt7Wv90sEpSu2JnFaAS55TZOYZMRZOxx1VHWHvUNqJtjPiPuwHsJ0ABvt3BGEfRVUyubsjguw%0D%0A&zx=ai3uuxeevhks&t=1")
            .headers(headers_5)
            .formParam("count", "2")
            .formParam("ofs", "0")
            .formParam("req0___data__", """{"database":"projects/dede-en3a/databases/(default)","addTarget":{"query":{"structuredQuery":{"from":[{"collectionId":"products"}],"orderBy":[{"field":{"fieldPath":"__name__"},"direction":"ASCENDING"}]},"parent":"projects/dede-en3a/databases/(default)/documents"},"targetId":2}}""")
            .formParam("req1___data__", """{"database":"projects/dede-en3a/databases/(default)","addTarget":{"query":{"structuredQuery":{"from":[{"collectionId":"user"}],"orderBy":[{"field":{"fieldPath":"__name__"},"direction":"ASCENDING"}]},"parent":"projects/dede-en3a/databases/(default)/documents"},"targetId":4}}""")
        )
    )
    .pause(6)
    .exec(
      http("request_6")
        .get(uri4)
        .headers(headers_6)
    )
    .pause(1)
    .exec(
      http("request_7")
        .post("/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fdede-en3a%2Fdatabases%2F(default)&VER=8&gsessionid=vmpXU7QbB-StMAcKpUXREZg5inwtuh4xXINSLiBB_HA&SID=lV-4nF53x1H8-WOhKvvBuw&RID=60490&AID=0&zx=mquv5dj5345&t=1")
        .headers(headers_5)
        .formParam("count", "1")
        .formParam("ofs", "2")
        .formParam("req0___data__", """{"database":"projects/dede-en3a/databases/(default)","addTarget":{"query":{"structuredQuery":{"from":[{"collectionId":"orders"}],"where":{"fieldFilter":{"field":{"fieldPath":"userEmail"},"op":"EQUAL","value":{"stringValue":"martinbeltrandiaz@gmail.com"}}},"orderBy":[{"field":{"fieldPath":"__name__"},"direction":"ASCENDING"}]},"parent":"projects/dede-en3a/databases/(default)/documents"},"targetId":6}}""")
    )
    .pause(1)
    .exec(
      http("request_8")
        .post("/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fdede-en3a%2Fdatabases%2F(default)&VER=8&gsessionid=vmpXU7QbB-StMAcKpUXREZg5inwtuh4xXINSLiBB_HA&SID=lV-4nF53x1H8-WOhKvvBuw&RID=60491&AID=0&zx=83avm5t6do7f&t=1")
        .headers(headers_5)
        .formParam("count", "1")
        .formParam("ofs", "3")
        .formParam("req0___data__", """{"database":"projects/dede-en3a/databases/(default)","removeTarget":2}""")
        .resources(
          http("request_9")
            .post("/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fdede-en3a%2Fdatabases%2F(default)&VER=8&gsessionid=vmpXU7QbB-StMAcKpUXREZg5inwtuh4xXINSLiBB_HA&SID=lV-4nF53x1H8-WOhKvvBuw&RID=60492&AID=0&zx=3zkqjyfu5ir4&t=1")
            .headers(headers_5)
            .formParam("count", "1")
            .formParam("ofs", "4")
            .formParam("req0___data__", """{"database":"projects/dede-en3a/databases/(default)","removeTarget":4}"""),
          http("request_10")
            .post("/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fdede-en3a%2Fdatabases%2F(default)&VER=8&gsessionid=vmpXU7QbB-StMAcKpUXREZg5inwtuh4xXINSLiBB_HA&SID=lV-4nF53x1H8-WOhKvvBuw&RID=60493&AID=0&zx=mlplxinjj5eb&t=1")
            .headers(headers_5)
            .formParam("count", "1")
            .formParam("ofs", "5")
            .formParam("req0___data__", """{"database":"projects/dede-en3a/databases/(default)","removeTarget":6}""")
        )
    )
    .pause(2)
    .exec(
      http("request_11")
        .get(uri3 + "?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")
        .headers(headers_11)
        .resources(
          http("request_12")
            .get("/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fdede-en3a%2Fdatabases%2F(default)&gsessionid=vmpXU7QbB-StMAcKpUXREZg5inwtuh4xXINSLiBB_HA&VER=8&RID=rpc&SID=lV-4nF53x1H8-WOhKvvBuw&CI=0&AID=0&TYPE=xmlhttp&zx=nsjwg3njvmv2&t=1")
            .headers(headers_5)
        )
    )
    .pause(8)
    .exec(
      http("request_13")
        .get(uri7)
        .headers(headers_13)
    )
    .pause(4)
    .exec(
      http("request_14")
        .options(uri1)
        .headers(headers_14)
        .resources(
          http("request_15")
            .post(uri1)
            .headers(headers_15)
            .body(RawFileBody("dede/firstsimulation/0015_request.json"))
        )
    )

setUp(scn.inject(constantUsersPerSec(5).during(15))).protocols(httpProtocol)
}
