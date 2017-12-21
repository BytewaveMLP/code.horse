document.query-selector-all '.prompt,.response'
	.for-each (.class-list.add \hidden)

timings =
	initial-delay  : 1
	ps1-delay      : 0.2
	ps1-show       : 0.2
	command-delay  : 0.6
	command-show   : 0.15
	response-delay : 0.5
	response-show  : 1

trace = -> console.log ...&; &[*-1]

document.query-selector \#skip-button
.add-event-listener \click, skip-prompts = !->
	document.query-selector-all '.prompt,.response'
	.for-each (block) !->
		with block
			..class-list.remove \hidden
			..class-list.remove \cursor
			..style.transition = ''
	document.query-selector \#skip-button .class-list.add \hidden

show-next-block = !->
	return skip-prompts! unless (block = document.query-selector do
		'.prompt.hidden,.response.hidden')?

	switch
	| block.class-list.contains \prompt =>
		[ps1, command] =
			[(block.query-selector \.ps1), (block.query-selector \.command)]
		block.class-list.remove \hidden
		with ps1.style
			..opacity = 0
			..transition = "opacity 
				#{timings.ps1-show}s"

		ps1-width = ps1.offset-width
		block.style.width = "#{ps1-width}px"
		{text-content:{length:char-count}, offset-width:command-width} = command
		block.style.transition = "width 
			#{char-count * timings.command-show}s 
			steps(#{char-count})"

		set-timeout do # show ps1
			!-> ps1.style.opacity = 1
			1000 * (delay = timings.ps1-delay)
		set-timeout do # show cursor
			!-> block.class-list.add \cursor
			1000 * (delay += timings.ps1-show)
		set-timeout do # show command
			!-> block.style.width = "#{ps1-width + command-width}px"
			1000 * (delay += timings.command-delay)
		set-timeout do # next block
			!->
				block.class-list.remove \cursor
				block.style.width = ''
				show-next-block!
			1000 * (delay += char-count * timings.command-show)

	| block.class-list.contains \response =>
		with block
			..style.opacity = 0
			..class-list.remove \hidden
			..style.transition = "opacity 
				#{timings.response-show}s"

		set-timeout do # show response
			!-> block.style.opacity = 1
			1000 * timings.response-delay
		set-timeout do # next block
			show-next-block
			1000 * (timings.response-show + timings.response-delay)

	| _ then throw new Error 'invalid command-line block'

set-timeout show-next-block, 1000 * timings.initial-delay

