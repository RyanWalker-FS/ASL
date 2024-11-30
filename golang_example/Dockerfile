FROM golang:latest
WORKDIR /usr/src/app
COPY hello.go .
RUN go build -o hello hello.go
CMD ["./hello"]

