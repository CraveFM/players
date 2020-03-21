package my.scalafx

import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.layout.BorderPane
import scalafx.scene.paint.Color
import scalafx.scene.web.WebView

object ScalaFXHelloWorld extends JFXApp {

  val webView = new  WebView()
  webView.getEngine.loadContent(
    """
      <audio controls #player src="http://www.largesound.com/ashborytour/sound/AshboryBYU.mp3" preload="none">
        Your browser does not support the audio element.
      </audio>
      """
  )

  stage = new PrimaryStage {
    title = "ScalaFX Hello World"
    scene = new Scene {
      fill = Color.rgb(38, 38, 38)
      content = new BorderPane {
        center = webView
      }
    }

  }
}
