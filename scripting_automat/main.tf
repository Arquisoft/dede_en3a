terraform {

  required_providers {

    docker = {

      source  = "kreuzwerker/docker"
      version = ">= 2.13.0"

    }

  }

}

provider "docker" {
    host = "npipe:////.//pipe//docker_engine"
}

resource "docker_image" "dede"{
    name = "dede:latest"
    keep_locally = false
}

resource "docker_container" "dede" {
  image = docker_image.dede.latest
  name = "dede"
  ports {
    internal = 3000
    external = 3000
  }
}