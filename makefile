CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -Wshadow -O2 -pedantic -Wno-sign-conversion -I /Users/kutay/CP/ac-library 
DEBUGFLAGS = -fsanitize=address -fsanitize=undefined -DLOCAL -DDEBUG -D_GLIBCXX_DEBUG -D_GLIBCXX_DEBUG_PEDANTIC
CXXFLAGS += $(DEBUGFLAGS)

TARGET := a
EXECUTE := ./$(TARGET)
CLEAN_TARGETS := $(TARGET)

CASES := $(sort $(basename $(wildcard *.in)))
TESTS := $(sort $(basename $(wildcard *.out)))

all: $(TARGET)

c:
	-rm -rf $(CLEAN_TARGETS) *.res

export TIME=\n  real\t%es\n  user\t%Us\n  sys\t%Ss\n  mem\t%MKB

r: $(TARGET)
	$(EXECUTE)

%.res: $(TARGET) %.in
	$(EXECUTE) < $*.in > $*.res

%.out: % # Cancel the builtin rule

__test_%: %.res %.out
	diff $*.res $*.out -bB

t: $(patsubst %,__test_%,$(TESTS))

.PHONY: all c r t __test_% 

.PRECIOUS: %.res


