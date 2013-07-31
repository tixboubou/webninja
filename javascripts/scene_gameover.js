

var GameOverScene = Class.create(Scene, {
    initialize: function (gameObj) {
        Scene.apply(this);
        this.m_GameObj = gameObj;
        this.m_LifeIcons = Array();
        this.m_Score = g_Score;
        this.m_TempScore = 0;
        this.m_Lives = 3;
        this.m_LblScore = new Label("");
        this.m_LblScore.font = "42px Caesar Dressing";
        this.m_LblScore.text = zeroFill(this.m_Score, 3);
        this.m_LblScore.x = 57;
        this.m_LblScore.color = "#ffde00";
        this.m_World = new PhysicsWorld(0.0, 9.8);
        var background = new Sprite(760,570);
        var backgroundOverlay = new Sprite(760,570);
        var scoreIcon = new Sprite(50,50);
        scoreIcon.x = 5;
        scoreIcon.y = 5;
        background.image = this.m_GameObj.assets[g_ImgBackgroundGameplay];
        backgroundOverlay.image = this.m_GameObj.assets[g_ImgBackgroundGameOver];
        backgroundOverlay.opacity = 0.75;
        this.addChild(background);
        this.addChild(backgroundOverlay);
        scoreIcon.image = this.m_GameObj.assets[g_ImgScore];
        this.addChild(scoreIcon);
        for (i = 0; i < 3; i++) {
            this.m_LifeIcons[i] = new Sprite(50,50);
            this.m_LifeIcons[i].image = this.m_GameObj.assets[g_ImgScore];
            this.m_LifeIcons[i].x = 550 + 50 * (i+1);
            this.m_LifeIcons[i].y = 5
            this.m_LifeIcons[i].frame = 2;
            this.addChild(this.m_LifeIcons[i]);
        }
        this.addChild(this.m_LblScore);

        this.m_LblPlay = new Label("");
        this.m_LblPlay.font = "42px Caesar Dressing";
        this.m_LblPlay.text = "Play again?";
        this.m_LblPlay.x = this.m_GameObj.width / 2 - 100;
        this.m_LblPlay.y = this.m_GameObj.height / 2 - 25;
        this.m_LblPlay.color = "#ffde00";
        this.addChild(this.m_LblPlay);

        this.playIcon = new Sprite(100,100);
        this.playIcon.x = this.m_GameObj.width / 2 - 50;
        this.playIcon.y = this.m_GameObj.height / 2 + 50;
        this.playIcon.image = this.m_GameObj.assets[g_ImgFruits];
        this.playIcon.frame = 0;
        this.addChild(this.playIcon);
        
        this.m_WantToPlay = false;

        this.playIcon.addEventListener(Event.TOUCH_START, function (e) {
            var x = this.x;
            var y = this.y;
            var splash = new Splash(this.scene.m_GameObj,x,y);
            this.scene.addChild(splash);
            this.scene.m_WantToPlay = true;
            this.scene.removeChild(this.scene.playIcon);
        });

        this.lifeTimer = 0;
        this.lifeTimerLimit = this.m_GameObj.fps * 10;

        this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    update: function (evt) {
        if (this.m_WantToPlay)
        {
            this.lifeTimer += evt.elapsed;
            if (this.lifeTimer > this.lifeTimerLimit)
            {
                goToScene("main", this.scene.m_GameObj);
            }
        }
    }
});