const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

const finish = (err, done) => {
    return err ? done(err) : done();
}

describe('GET /iecho', () => {
    it('Should return status 200', (done) => {
        request(app)
            .get('/iecho?text=123')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => finish(err, done))
    })
    it('Should return the text inverted', (done) => {
        
        request(app)
            .get('/iecho?text=123')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).to.equal('321'); 
            })
            .end((err) => finish(err, done))
            
    })
    it("Should say if its not a palindrome", (done) => {
        
        request(app)
            .get('/iecho?text=aA123')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                expect(res.body.palindrome).to.equal(false);
            })
            .end((err) => finish(err, done))
            
    })

    describe('GET /iecho w/palindrome', () => {

        it('Should return the text inverted and say if is a palindrome', (done) => {
            
            request(app)
                .get('/iecho?text=AA313AA')
                .expect('Content-Type', /json/)
                .expect(({ body }) => {
                    expect(body.text).to.equal('AA313AA');
                    expect(body.palindrome).to.equal(true);
                })
                .end((err) => finish(err, done))
                
        })
        it("Shouldn't take in account if there is a space between", (done) => {
            
            request(app)
                .get('/iecho?text=AB%20CBA')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(({ body }) => {
                    expect(body.text).to.equal('ABC BA');
                    expect(body.palindrome).to.equal(true);
                })
                .end((err) => finish(err, done))
        })
        it("Shouldn't be case sensitive", (done) => {
            
            request(app)
                .get('/iecho?text=abCBA')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(({ body }) => {
                    expect(body.text).to.equal('ABCba');
                    expect(body.palindrome).to.equal(true);
                })
                .end((err) => finish(err, done))
        })
    })



    describe('GET /iecho w/error', () => {

        it('should return status 400 if no param text is sent', done => {
            request(app)
                .get('/iecho')
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err) => finish(err, done))
        })
        it('should return status 400 if the text has less than 3 characters', done => {
            request(app)
                .get('/iecho?text=Ab')
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err) => finish(err, done))                
        })
    })
})