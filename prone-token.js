console.log("Prone Token module loaded");

Hooks.on("updateToken", (scene, sceneID, update, options, userId) => {
    ProneToken.HookOnUpdateToken(scene, sceneID, update, options, userId);
});

class ProneToken{

    static HookOnUpdateToken(scene, sceneID, update, options, userId) {
        if (!game.user.isGM) {
            return;
        }
        
        let token = canvas.tokens.get(update._id);

        //console.log(token);

        if (token.actor.data.type !== "character") return;

        var found = token.data.effects.find(function(effect) {
            return effect.includes("falling.svg") || effect.includes("prone.svg") || effect.includes("skull.svg") || effect.includes("unconscious.svg") || effect.includes("dead.svg");
          });
          
        if (found && !token.data.img.includes("_prone")) {
                
            var extension = token.data.img.split('.').pop();

            var img = token.data.img.substr(0, token.data.img.lastIndexOf(".")) + "_prone." + extension;
            
            if (this._urlExists(img)) {
                console.log("Prone Token | Found a prone effect - change token image");
                token.update({"img": img});
            }

            return;

        } else if (!found && token.data.img.includes("_prone")){

            var img = token.data.img.replace("_prone", "");

            if (this._urlExists(img)) {
                console.log("Prone Token | No longer prone - reset token image");
                token.update({"img": img});
            }

            return;

        }

    }

    static _urlExists(url)
    {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    }

}





