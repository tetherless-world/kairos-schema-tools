package services

import javax.inject.{Inject, Singleton}
import services.validation.KsfValidationApiService

@Singleton
class Services @Inject() (val ksfValidationApiService: KsfValidationApiService)
