should = require('chai').should(),
    scapegoat = require('../index'),
    escape = scapegoat.escape,
    unescape = scapegoat.unescape;

describe('#escape', function() {
  it('converts', function() {
    escape('&').should.equal('&amp;');
  });

  it('converts', function() {
    escape('"').should.equal('&quot;');
  });

  it('converts', function() {
    escape('\'').should.equal('&#39;');
  });

  it('converts', function() {
    escape('<').should.equal('&lt;');
  });

  it('converts', function() {
    escape('>').should.equal('&gt;');
  });
});

describe('#unescape', function() {
  it('converts', function() {
    unescape('&amp;').should.equal('&');
  });

  it('converts', function() {
    unescape('&quot;').should.equal('"');
  });

  it('converts', function() {
    unescape('&#39;').should.equal('\'');
  });

  it('converts', function() {
    unescape('&lt;').should.equal('<');
  });

  it('converts', function() {
    unescape('&gt;').should.equal('>');
  });
});
