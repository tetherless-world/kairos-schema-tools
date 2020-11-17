package stores

import java.nio.file.{Files, Path, Paths}

import play.api.Configuration

final case class FsStoreConfiguration(dataDirectoryPath: Path)

object FsStoreConfiguration {
  def fromConfiguration(configuration: Configuration): Option[FsStoreConfiguration] = {
    for (testDataDirectoryPath <- configuration.getOptional[String]("dataDirectoryPath").map(Paths.get(_)).toList ++ List(
      Paths.get("/data"),
      Paths.get("conf").resolve("data")
    )) {
      if (Files.isDirectory(testDataDirectoryPath)) {
        return Some(new FsStoreConfiguration(testDataDirectoryPath))
      }
    }
    None
  }
}
