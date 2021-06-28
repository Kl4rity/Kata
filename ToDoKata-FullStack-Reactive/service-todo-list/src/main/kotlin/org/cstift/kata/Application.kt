package org.cstift.kata

import io.micronaut.runtime.Micronaut.*
fun main(args: Array<String>) {
	build()
	    .args(*args)
		.packages("org.cstift.kata")
		.start()
}

