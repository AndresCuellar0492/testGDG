DIR_ANDROID := ./$(PLATFORM)/.
DIR_IOS := ./ios/.

build:
	ionic build
ifneq ($(wildcard $(DIR_ANDROID)),)
	@echo "Found ~/Android."
else
	@echo "Did not find ~/Android."
	npx cap add $(PLATFORM)
endif
	npx cap sync $(PLATFORM)
##make external
##npx cap open android

external: 
	ionic cap run android --livereload --external