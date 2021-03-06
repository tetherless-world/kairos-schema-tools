package stores

import java.nio.file.{Files, Path}

import org.apache.commons.io.FileUtils
import org.scalatest.{BeforeAndAfterEach, WordSpec}
import validators.Validators

class FsStoreSpec extends WordSpec with StoreBehaviors with BeforeAndAfterEach {
  private implicit val ec = scala.concurrent.ExecutionContext.Implicits.global
  private var tempDirectoryPath: Path = _

  override protected def beforeEach(): Unit =
    tempDirectoryPath = Files.createTempDirectory(null)

  override protected def afterEach(): Unit =
    FileUtils.deleteDirectory(tempDirectoryPath.toFile)

  behave like store(() => new FsStore(new FsStoreConfiguration(tempDirectoryPath), new Validators(List())))
}
