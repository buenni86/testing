import { bootstrapExtra } from "@workadventure/scripting-api-extra"
console.log("Script started successfully")
bootstrapExtra();
// end: mox scripting

//import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";

var currentPopup = undefined;
var isCoWebSiteOpened =  false;
var urlTutorial = "https://db-planet.deutschebahn.com/pages/telefonie/apps/content/workadventure-erste-schritte";
//var urlFeedback = "mailto:DB.Systel.CommunicationServices.EVS@deutschebahn.com";
var urlFeedback = "https://forms.office.com/Pages/ResponsePage.aspx?id=nC2noeZJbU-a9lqvoRg7_f26WHDvlOFNi_8Y43fECOdUMDVDTUpUUDRONkxHMzdLQ09WRlQxUUZSMS4u";
var urlInfo = "https://db.de/workadventure";
var urlInfoOrder = "https://dbserviceportal.service-now.com/serviceportal?id=sc_cat_item&category_sys_id=undefined&sys_id=0fa1b33e1b4bf010159842229b4bcb0e";
const map = await WA.room.getTiledMap();

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

var zoneFeedback = "feedback";
var zoneTutorial = "tutorial";
var zoneInfo = "info";
var zoneInfoOrder = "info-order";
var zoneTableTennis = "tabletennis";
var zoneInformation = "information";

var pongMsg = "Pong gegeneinander?\n\n1.Wählen Sie Online-Mehrspielermodus\n" +
"2.Wählen Sie 'Beiläufig'\n3.Geben Sie eine Zimmernummer ein und klicken Sie auf 'Zimmer ändern'\n" +
"4. Teilen Sie die Zimmernummer Ihrem Partner mit\n\n" +
"Die Steuerung funktioniert mit den Pfeiltasten."

WA.room.onEnterZone(zoneTutorial, () => {
   currentPopup =  WA.ui.openPopup("popUpTutorial","Tutorial ansehen?",[
        {
            label: "OK",
            callback: (popup => {
                WA.nav.openTab(urlTutorial);
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }]);
})

WA.room.onLeaveZone(zoneTutorial, () =>{
    closePopUp();

    if (isCoWebSiteOpened) {
        WA.nav.closeCoWebSite();
        isCoWebSiteOpened = false;
    }
})

WA.room.onEnterZone(zoneFeedback, () => {
   currentPopup =  WA.ui.openPopup("popUpFeedback","Hier kannst du Feedback abgeben.",[
        {
            label: "Feedback",
            callback: (popup => {
                WA.nav.openCoWebSite(urlFeedback);
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }]);
})

WA.room.onLeaveZone(zoneFeedback, () =>{
    closePopUp();

    if (isCoWebSiteOpened) {
        WA.nav.closeCoWebSite();
        isCoWebSiteOpened = false;
    }
})

WA.room.onEnterZone(zoneInfo, () => {
   currentPopup =  WA.ui.openPopup("popUpInfo","Willkommen im EVS-Teambüro! Sprich uns gerne direkt an und komm bei uns vorbei! \n Mehr zu Workadventure auf ...",[
        {
            label: "DB Planet",
            callback: (popup => {
                WA.nav.openTab(urlInfo);
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }]);
})

WA.room.onLeaveZone(zoneInfo, () =>{
    closePopUp();

    if (isCoWebSiteOpened) {
        WA.nav.closeCoWebSite();
        isCoWebSiteOpened = false;
    }
})


WA.room.onEnterZone(zoneInfoOrder, () => {
   currentPopup =  WA.ui.openPopup("popUpInfoOrder","Ihr möchtet auch ein eigenes Teambüro mit kurzer Info zu euch? Hier könnt ihr dies beantragen.",[
        {
            label: "Digitalportal",
            callback: (popup => {
                WA.nav.openTab(urlInfoOrder);
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }]);
})

WA.room.onLeaveZone(zoneInfoOrder, () =>{
    closePopUp();

    if (isCoWebSiteOpened) {
        WA.nav.closeCoWebSite();
        isCoWebSiteOpened = false;
    }
})


WA.room.onEnterZone(zoneTableTennis, () => {
   currentPopup =  WA.ui.openPopup("popUpTableTennis", pongMsg, [
        {
            label: "Verstanden",
            callback: (popup => {
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }]);
})

WA.room.onLeaveZone(zoneTableTennis, () =>{
    closePopUp();

    if (isCoWebSiteOpened) {
        WA.nav.closeCoWebSite();
        isCoWebSiteOpened = false;
    }
})

WA.room.onEnterZone(zoneInformation, () => {
   currentPopup =  WA.ui.openPopup("popUpInformation","Der Sommer ist da, schnapp dir ein Eis und besuche uns draußen vor dem Silberturm!\nLauf einfach in den Foyer und spring ins Portal in die DB Workadventure WorldTour!",[
        {
            label: "OK",
            callback: (popup => {
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }]);
})

WA.room.onLeaveZone(zoneInformation, () =>{
    closePopUp();

    if (isCoWebSiteOpened) {
        WA.nav.closeCoWebSite();
        isCoWebSiteOpened = false;
    }
})

// start: mox scripting
const buttons = [
    {
      label: "Reset",
      className: "error",
      callback: () =>
        (WA.state.votePos = WA.state.voteNeg = WA.state.voteNeut = 0)
    }
  ]
  
  // Waiting for the API to be ready
  WA.onInit()
    .then(async () => {
      console.log("Scripting API ready")
      console.log("Player tags: ", WA.player.tags)
  
      let website
      WA.room.onEnterLayer("infoPopup").subscribe(() => {
        openInfoWebsite().then(_website => (website = _website))
      })
  
      WA.room.onLeaveLayer("infoPopup").subscribe(() => {
        website.visible = false
      })
  
      WA.room.onEnterLayer("votePos").subscribe(() => {
        console.log("VotePos: ", WA.state.votePos)
        WA.state.votePos++
      })
      WA.room.onLeaveLayer("votePos").subscribe(() => {
        console.log("VotePos: ", WA.state.votePos)
        if (WA.state.votePos === 0) return
        WA.state.votePos--
      })
      WA.room.onEnterLayer("voteNeg").subscribe(() => {
        console.log("voteNeg: ", WA.state.voteNeg)
        WA.state.voteNeg++
      })
      WA.room.onLeaveLayer("voteNeg").subscribe(() => {
        console.log("voteNeg: ", WA.state.voteNeg)
        if (WA.state.voteNeg === 0) return
        WA.state.voteNeg--
      })
      WA.room.onEnterLayer("voteNeut").subscribe(() => {
        console.log("voteNeut: ", WA.state.voteNeut)
        WA.state.voteNeut++
      })
      WA.room.onLeaveLayer("voteNeut").subscribe(() => {
        console.log("voteNeut: ", WA.state.voteNeut)
        if (WA.state.voteNeut === 0) return
        WA.state.voteNeut--
      })
  
      let voteResetPopup
      WA.room.onEnterLayer("voteRes").subscribe(() => {
        voteResetPopup = WA.ui.openPopup(
          "resetPopup",
          "Soll das Voting zurückgesetzt werden?",
          buttons
        )
      })
      WA.room.onLeaveLayer("voteRes").subscribe(() => {
        voteResetPopup.close()
      })
	  
	  // WA.state.onVariableChange("roomX").subscribe((value) => {
		  	// WA.room.setTiles({ x: WA.state.roomX, y: WA.state.npc1, tile: "movingObject", layer: "roomAPI"});
		// });
	  
      WA.state.onVariableChange("npc1").subscribe(async (value) => {
        console.log(WA.state.npc1)
        WA.room.setTiles([
          { x: WA.state.npc1.x2, y: WA.state.npc1.y2, tile: null, layer: "roomAPI" },
          { x: WA.state.npc1.x1, y: WA.state.npc1.y1, tile: "movingObject", layer: "roomAPI" }]);
      })
	  
      WA.state.onVariableChange("npc2").subscribe(async (value) => {
        console.log(WA.state.npc2)
        WA.room.setTiles([
          { x: WA.state.npc2.x2, y: WA.state.npc2.y2, tile: null, layer: "roomAPI" },
          { x: WA.state.npc2.x1, y: WA.state.npc2.y1, tile: "movingObject", layer: "roomAPI" },]);
      })
		  	
  
      // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
      bootstrapExtra()
        .then(() => {
          console.log("Scripting API Extra ready")
        })
        .catch(e => console.error(e))
    })
    .catch(e => console.error(e))
  
  async function openInfoWebsite() {
    return await WA.ui.website.open({
      url: "https://tstosius.github.io/worktest/info.html",
      position: {
        vertical: "middle",
        horizontal: "middle"
      },
      size: {
        width: "50vh",
        height: "50vh"
      }
    })
  }
  
  export {}