import"https://unpkg.com/@workadventure/scripting-api-extra@^1";var n=void 0,e=!1,s="https://db-planet.deutschebahn.com/pages/telefonie/apps/content/workadventure",c="https://www.youtube-nocookie.com/embed/36YnV9STBqc?autoplay=1",f="https://www.chefkoch.de/rezepte/1092131215242366/Eiskaffee-Latte-macchiato.html",m="mailto:DB.Systel.CommunicationServices.EVS@deutschebahn.com";function o(){n!==void 0&&(n.close(),n=void 0)}var p="feedback",r="info",t="infoDoor",l="musik",i="cafe",u="testURL";WA.room.onEnterZone(u,()=>{n=WA.ui.openPopup("popUpTestURL","Test URL \xF6ffnen?.",[{label:"OK",callback:a=>{WA.nav.openCoWebSite(WA.state.testURL,!1,"autoplay;camera;microphone;fullscreen;encrypted-media"),e=!0,o()}}])});WA.room.onLeaveZone(u,()=>{o(),e&&(WA.nav.closeCoWebSite(),e=!1)});WA.room.onEnterZone(p,()=>{n=WA.ui.openPopup("popUpFeedback","Hier kannst du Feedback abgeben.",[{label:"OK",callback:a=>{WA.nav.openCoWebSite(WA.state.feedbackURL,!1,"autoplay; fullscreen; encrypted-media"),e=!0,o()}}])});WA.room.onLeaveZone(p,()=>{o(),e&&(WA.nav.closeCoWebSite(),e=!1)});WA.room.onEnterZone(r,()=>{n=WA.ui.openPopup("popUpInfo","Willkommen im \xF6ffentlichen Bespr\xE4chungsraum Team EVS, m\xF6chtest du mehr Informationen zu WorkAdventure erfahren?",[{label:"Her damit!",callback:a=>{WA.nav.openTab(s),e=!0,o()}}])});WA.room.onLeaveZone(r,()=>{o(),e&&(WA.nav.closeCoWebSite(),e=!1)});WA.room.onEnterZone(t,()=>{n=WA.ui.openPopup("popUpInfoDoor",`Falls die T\xFCr verschlossen ist, am besten einen Termin mit uns vereinbaren
\u{1F4E7} Team EVS \u{1F4E7}`,[{label:"E-Mail",className:"error",callback:a=>{WA.nav.openTab(m),e=!0,o()}}])});WA.room.onLeaveZone(t,()=>{o()});WA.room.onEnterZone(l,()=>{n=WA.ui.openPopup("popUpMusik","Ein wenig Musik gef\xE4llig?",[{label:"Her damit!",callback:a=>{WA.nav.openCoWebSite(c,!1,"autoplay; fullscreen; encrypted-media"),e=!0,o()}}])});WA.room.onLeaveZone(l,()=>{o(),e&&(WA.nav.closeCoWebSite(),e=!1)});WA.room.onEnterZone(i,()=>{n=WA.ui.openPopup("popUpCafe",`Leider,
do it yourself`,[{label:"Empfehlung",callback:a=>{WA.nav.openTab(f),e=!0,o()}}])});WA.room.onLeaveZone(i,()=>{o(),e&&(WA.nav.closeCoWebSite(),e=!1)});
