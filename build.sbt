import sbt.Resolver

val twxploreVersion = "1.0.0-SNAPSHOT"

resolvers in ThisBuild += Resolver.sonatypeRepo("snapshots")

lazy val app = (project in file("."))
  .enablePlugins(PlayScala)
  .settings(
    libraryDependencies ++= Seq(
      // Implement search in the MemStore (and thus the TestStore)
      "com.outr" %% "lucene4s" % "1.9.1",
      "io.github.tetherless-world" %% "twxplore-base" % twxploreVersion,
      "io.github.tetherless-world" %% "twxplore-test" % twxploreVersion % Test,
    ),
    maintainer := "gordom6@rpi.edu",
    name := "kairos-schema-tools-app",
    scalaVersion := "2.12.10",
    version := "1.0.0-SNAPSHOT"
  )
